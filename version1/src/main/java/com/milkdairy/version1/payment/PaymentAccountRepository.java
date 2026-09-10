package com.milkdairy.version1.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentAccountRepository extends JpaRepository<PaymentAccount, Long> {
    boolean existsByFarmerId(Long farmerId);
}
