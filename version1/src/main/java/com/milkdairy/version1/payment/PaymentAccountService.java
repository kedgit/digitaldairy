package com.milkdairy.version1.payment;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.milkdairy.version1.exception.PaymentAccountNotFoundException;

@Service
public class PaymentAccountService {

    private final PaymentAccountRepository paymentAccountRepository;

    public PaymentAccountService(
            PaymentAccountRepository paymentAccountRepository) {
        this.paymentAccountRepository = paymentAccountRepository;
    }

    public boolean existsByFarmerId(Long farmerId) {
        return paymentAccountRepository.existsByFarmerId(farmerId);
    }

    public void createAccount(Long farmerId, LocalDateTime supplyStartDateTime) {

        PaymentAccount account = new PaymentAccount();

        account.setFarmerId(farmerId);
        account.setSupplyStartDateTime(supplyStartDateTime);
        account.setLastSettledDateTime(null);
        paymentAccountRepository.save(account);
        return;
    }

    public PaymentAccount getAccount(Long farmerId) {

        return paymentAccountRepository.findById(farmerId)
                .orElseThrow(() ->
                        new PaymentAccountNotFoundException(
                                "Payment account not found for farmer: "
                                        + farmerId));
    }
}
