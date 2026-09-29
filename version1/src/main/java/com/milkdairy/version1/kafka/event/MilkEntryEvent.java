package com.milkdairy.version1.kafka.event;

import java.math.BigDecimal;

public class MilkEntryEvent {

    private Long farmerId;
    private BigDecimal amount;
    private BigDecimal quantity;
    private BigDecimal fat;

    public MilkEntryEvent() {
    }

    public MilkEntryEvent(Long farmerId, BigDecimal quantity, BigDecimal fat, BigDecimal amount) {
        this.farmerId = farmerId;
        this.amount = amount;
        this.quantity = quantity;
        this.fat = fat;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getFat() {
        return fat;
    }

    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }
}