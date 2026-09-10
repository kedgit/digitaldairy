package com.milkdairy.version1.payment;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

import com.milkdairy.version1.farmer.Farmers;
import com.milkdairy.version1.exception.FarmerNotFoundException;
import com.milkdairy.version1.farmer.FarmerRepository;

@Service
public class AdvancePaymentService {

    private final AdvancePaymentRepository advancePaymentRepository;
    private final FarmerRepository farmerRepository;

    public AdvancePaymentService(
            AdvancePaymentRepository advancePaymentRepository,
            FarmerRepository farmerRepository) {

        this.advancePaymentRepository = advancePaymentRepository;
        this.farmerRepository = farmerRepository;
    }

    public AdvancePayment takeAdvance(
            AdvancePayment request) {
        
        Long farmerId = request.getFarmerId();
        BigDecimal amount = request.getAmount();
        String remarks = request.getRemarks();

        if (farmerId == null) {
            throw new RuntimeException("Farmer ID is required");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Advance amount must be greater than zero");
        }

        Farmers farmer = farmerRepository.findByFarmerId(farmerId)
                .orElseThrow(() ->
                        new FarmerNotFoundException("Farmer not found"));

        AdvancePayment advance = new AdvancePayment();

        advance.setFarmerId(farmer.getFarmerId());
        advance.setAmount(amount);
        advance.setRemainingAmount(amount);
        advance.setRemarks(remarks);

        return advancePaymentRepository.save(advance);
    }

    public List<AdvancePayment> getAdvancesByFarmerId(Long farmerId) {

        if (farmerId == null) {
            throw new IllegalArgumentException("Farmer ID cannot be null");
        }

        return advancePaymentRepository.findByFarmerId(farmerId);
    }
}
