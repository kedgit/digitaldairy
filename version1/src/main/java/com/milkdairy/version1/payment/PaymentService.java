package com.milkdairy.version1.payment;

import java.math.BigDecimal;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.milkdairy.version1.exception.FarmerNotFoundException;
import com.milkdairy.version1.exception.PaymentAccountNotFoundException;
import com.milkdairy.version1.farmer.*;
import com.milkdairy.version1.milkentry.MilkEntry;
import com.milkdairy.version1.milkentry.MilkEntryRepository;
import com.milkdairy.version1.user.EmailService;
import com.milkdairy.version1.user.User;
import com.milkdairy.version1.user.UserRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentAccountRepository paymentAccountRepository;
    private final MilkEntryRepository milkEntryRepository;
    private final FarmerRepository farmerRepository;
    private final AdvancePaymentRepository advancePaymentRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public PaymentService(
            PaymentRepository paymentRepository,
            PaymentAccountRepository paymentAccountRepository,
            FarmerRepository farmerRepository,
            AdvancePaymentRepository advancePaymentRepository,
            MilkEntryRepository milkEntryRepository,
            UserRepository userRepository,
            EmailService emailService) {

        this.paymentRepository = paymentRepository;
        this.paymentAccountRepository = paymentAccountRepository;
        this.farmerRepository = farmerRepository;
        this.advancePaymentRepository = advancePaymentRepository;
        this.milkEntryRepository = milkEntryRepository;
        this.userRepository = userRepository;
        this.emailService=emailService;
    }

    public List<Payment> getPaymentHistory(Long farmerId) {

        if (farmerId == null) {
            throw new RuntimeException("Farmer ID is required");
        }

        // Check farmer exists
        farmerRepository.findById(farmerId).orElseThrow(() -> new FarmerNotFoundException("Farmer Not Found..."));

        return paymentRepository
                .findByFarmerIdOrderByPaymentDateTimeDesc(farmerId);
    }

    @Transactional(readOnly = true)
    public Payment makePayment(Long farmerId) {
        return calculatePayment(farmerId);
    }

    @Transactional
    public Payment savePayment(Long farmerId) {

        Payment payment = calculatePayment(farmerId);

        List<AdvancePayment> advances = advancePaymentRepository
                .findByFarmerIdAndRemainingAmountGreaterThanOrderByAdvanceDateTimeAsc(
                        farmerId, BigDecimal.ZERO);

        BigDecimal remaining = payment.getTotalAmount();
        BigDecimal deducted = BigDecimal.ZERO;

        for (AdvancePayment advance : advances) {

            if (remaining.signum() <= 0)
                break;

            BigDecimal amount = advance.getRemainingAmount().min(remaining);

            advance.setRemainingAmount(
                    advance.getRemainingAmount().subtract(amount));

            remaining = remaining.subtract(amount);
            deducted = deducted.add(amount);

            advancePaymentRepository.save(advance);
        }

        payment.setAdvanceAmountDeducted(deducted);
        payment.setPayableAmount(remaining);
        payment.setPaymentStatus("PAID");

        Payment saved = paymentRepository.save(payment);

        Farmers farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new FarmerNotFoundException("Farmer Not Found..."));

        User user = userRepository.findById(farmer.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found..."));

        emailService.sendPaymentSuccessfulMail(user.getEmail(), user.getUsername(),payment.getPeriodStart(), payment.getPeriodEnd(),
                payment.getPaymentDateTime(), payment.getTotalAmount());

        PaymentAccount account = paymentAccountRepository.findById(farmerId)
                .orElseThrow(() -> new PaymentAccountNotFoundException("Payment account not found"));

        account.setLastSettledDateTime(saved.getPaymentDateTime());
        paymentAccountRepository.save(account);

        return saved;
    }

    private Payment calculatePayment(Long farmerId) {

        if (farmerId == null)
            throw new RuntimeException("Farmer ID is required");

        Farmers farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new FarmerNotFoundException("Farmer Not Found..."));

        PaymentAccount account = paymentAccountRepository.findById(farmerId)
                .orElseThrow(() -> new PaymentAccountNotFoundException("Payment account not found"));

        LocalDateTime start = account.getLastSettledDateTime() == null
                ? account.getSupplyStartDateTime()
                : account.getLastSettledDateTime();

        LocalDateTime end = LocalDateTime.now().withNano(0);

        List<MilkEntry> entries = milkEntryRepository
                .findByFarmerIdAndEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThan(
                        farmerId, start, end);

        if (entries.isEmpty())
            throw new RuntimeException("No milk entries found for payment period");

        BigDecimal milk = BigDecimal.ZERO;
        BigDecimal amount = BigDecimal.ZERO;

        for (MilkEntry e : entries) {
            milk = milk.add(e.getQuantityLiter());
            amount = amount.add(e.getAmount());
        }

        BigDecimal remaining = amount;
        BigDecimal deducted = BigDecimal.ZERO;

        List<AdvancePayment> advances = advancePaymentRepository
                .findByFarmerIdAndRemainingAmountGreaterThanOrderByAdvanceDateTimeAsc(
                        farmerId, BigDecimal.ZERO);

        for (AdvancePayment advance : advances) {

            if (remaining.signum() <= 0)
                break;

            BigDecimal deduction = advance.getRemainingAmount().min(remaining);

            remaining = remaining.subtract(deduction);
            deducted = deducted.add(deduction);
        }

        Payment payment = new Payment();
        payment.setFarmerId(farmer.getFarmerId());
        payment.setPeriodStart(start);
        payment.setPeriodEnd(end);
        payment.setTotalMilk(milk);
        payment.setTotalAmount(amount);
        payment.setAdvanceAmountDeducted(deducted);
        payment.setPayableAmount(remaining);
        payment.setPaymentDate(end);
        payment.setPaymentStatus("PENDING");

        return payment;
    }

}

// @Transactional
// public Payment makePayment(Long farmerId) {

// // 1. Validate farmer ID
// if (farmerId == null) {
// throw new RuntimeException("Farmer ID is required");
// }

// // 2. Find farmer
// Farmers farmer = farmerRepository
// .findById(farmerId)
// .orElseThrow(() ->
// new RuntimeException("Farmer Not Found..."));

// // 3. Find payment account
// PaymentAccount account = paymentAccountRepository
// .findById(farmerId)
// .orElseThrow(() ->
// new RuntimeException(
// "Payment account not found for farmer: "
// + farmerId));

// // 4. Determine payment period
// LocalDateTime startDateTime;

// if (account.getLastSettledDateTime() == null) {
// startDateTime = account.getSupplyStartDateTime();
// } else {
// startDateTime = account.getLastSettledDateTime();
// }

// LocalDateTime paymentDateTime = LocalDateTime.now().withNano(0);

// // 5. Prevent duplicate/no pending payment
// if (startDateTime.isAfter(paymentDateTime)) {
// throw new RuntimeException("No pending payment available");
// }

// // 6. Get milk entries
// List<MilkEntry> entries =
// milkEntryRepository.findByFarmerIdAndEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThanEqual(farmerId,startDateTime,paymentDateTime);

// if (entries.isEmpty()) {
// throw new RuntimeException("No milk entries found for payment period");
// }

// // 7. Calculate milk and amount
// BigDecimal totalMilk = BigDecimal.ZERO;
// BigDecimal totalAmount = BigDecimal.ZERO;

// for (MilkEntry entry : entries) {

// totalMilk = totalMilk.add(
// entry.getQuantityLiter());

// totalAmount = totalAmount.add(
// entry.getAmount());
// }

// // 8. Deduct outstanding advances
// BigDecimal remainingMilkAmount = totalAmount;
// BigDecimal advanceDeducted = BigDecimal.ZERO;

// List<AdvancePayment> advances =
// advancePaymentRepository
// .findByFarmerIdAndRemainingAmountGreaterThanOrderByAdvanceDateTimeAsc(
// farmerId,
// BigDecimal.ZERO);

// for (AdvancePayment advance : advances) {

// if (remainingMilkAmount.compareTo(BigDecimal.ZERO) <= 0) {
// break;
// }

// BigDecimal advanceRemaining =
// advance.getRemainingAmount();

// if (advanceRemaining.compareTo(remainingMilkAmount) <= 0) {

// remainingMilkAmount =
// remainingMilkAmount.subtract(advanceRemaining);

// advanceDeducted =
// advanceDeducted.add(advanceRemaining);

// advance.setRemainingAmount(BigDecimal.ZERO);

// } else {

// advanceDeducted =
// advanceDeducted.add(remainingMilkAmount);

// advance.setRemainingAmount(
// advanceRemaining.subtract(remainingMilkAmount));

// remainingMilkAmount = BigDecimal.ZERO;
// }

// }

// // 9. Create payment
// Payment payment = new Payment();

// payment.setFarmerId(farmer.getFarmerId());
// payment.setPeriodStart(startDateTime);
// payment.setPeriodEnd(paymentDateTime);
// payment.setTotalMilk(totalMilk);
// payment.setTotalAmount(totalAmount);
// payment.setAdvanceAmountDeducted(advanceDeducted);
// payment.setPayableAmount(remainingMilkAmount);
// payment.setPaymentDate(paymentDateTime);
// payment.setPaymentStatus("PENDING");

// return payment;
// }

// @Transactional
// public Payment savePayment(Long farmerId) {

// // save with advance deduct and remaining make 0
// // AdvancePayment advance ;
// // advancePaymentRepository.save(advance);
// paymentAccountRepository.save(advance);
// // recall to confirm
// Payment payment = makePayment(farmerId);
// // 10. Save payment
// // CHANGE STATUS
// payment.setPaymentStatus("PAID");
// paymentRepository.save(payment);

// // 11. Update settlement date
// PaymentAccount account = new PaymentAccount();
// account.setLastSettledDateTime(payment.getPaymentDateTime());

// paymentAccountRepository.save(account);

// return paymentRepository.save(payment);
// }
// }
