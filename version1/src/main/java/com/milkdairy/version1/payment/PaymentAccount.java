package com.milkdairy.version1.payment;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_account")
public class PaymentAccount {

    @Id
    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(name = "supply_start_date_time", nullable = false)
    private LocalDateTime supplyStartDateTime;

    @Column(name = "last_settled_date_time")
    private LocalDateTime lastSettledDateTime;

    public PaymentAccount() {
    }

    public PaymentAccount(Long farmerId, LocalDateTime supplyStartDateTime, LocalDateTime lastSettledDateTime) {
        this.farmerId = farmerId;
        this.supplyStartDateTime = supplyStartDateTime;
        this.lastSettledDateTime = lastSettledDateTime;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public LocalDateTime getSupplyStartDateTime() {
        return supplyStartDateTime;
    }

    public void setSupplyStartDateTime(LocalDateTime supplyStartDateTime) {
        this.supplyStartDateTime = supplyStartDateTime;
    }

    public LocalDateTime getLastSettledDateTime() {
        return lastSettledDateTime;
    }

    public void setLastSettledDateTime(LocalDateTime lastSettledDateTime) {
        this.lastSettledDateTime = lastSettledDateTime;
    }
}
