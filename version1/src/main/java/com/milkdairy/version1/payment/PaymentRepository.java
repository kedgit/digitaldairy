package com.milkdairy.version1.payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.milkdairy.version1.milkentry;

public interface PaymentRepository extends JpaRepository<Payment,Long>{
List<Payment> findByFarmerIdOrderByPaymentDateTimeDesc(Long farmerId);
}
