package com.milkdairy.version1.payment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
//import com.milkdairy.version1.milkentry.AdvancePayment;
import java.util.List;

public interface AdvancePaymentRepository extends JpaRepository<AdvancePayment,Long>{

    List<AdvancePayment> findByFarmerIdAndRemainingAmountGreaterThanOrderByAdvanceDateTimeAsc(
        Long farmerId,
        BigDecimal amount);

    List<AdvancePayment> findByFarmerId(Long farmerId);

}
