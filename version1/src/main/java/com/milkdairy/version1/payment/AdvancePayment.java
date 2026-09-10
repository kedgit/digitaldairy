package com.milkdairy.version1.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.*;

@Entity
@Table(name = "advance_payment")
@DynamicInsert
public class AdvancePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "advance_id")
    private Long advanceId;

   
    @JoinColumn(name = "farmer_id", nullable = false)
    private Long farmerId;

    @Column(name = "advance_date")
    private LocalDateTime advanceDateTime;

    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name="remaining_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal remainingAmount;

    @Column(name = "remarks")
    private String remarks;

    public AdvancePayment() {
    }

    public Long getAdvanceId() {
        return advanceId;
    }

    public void setAdvanceId(Long advanceId) {
        this.advanceId = advanceId;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public LocalDateTime getAdvanceDateTime() {
        return advanceDateTime;
    }

    public void setAdvanceDateTime(LocalDateTime advanceDateTime) {
        this.advanceDateTime = advanceDateTime;
    }

    public BigDecimal getRemainingAmount(){
        return remainingAmount;
    }

    public void setRemainingAmount(BigDecimal remainingAmount){
        this.remainingAmount=remainingAmount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}