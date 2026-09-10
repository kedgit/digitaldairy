package com.milkdairy.version1.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

   
    @Column(name = "farmer_id", nullable = false)
    private Long farmerId;

    @Column(name="period_start", nullable=false)
    private LocalDateTime periodStart;

    @Column(name="period_end", nullable = false)
    private LocalDateTime periodEnd;

    @Column(name = "total_quantity", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalMilk;

    @Column(name = "total_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "advance_amount", precision = 10, scale = 2)
    private BigDecimal advanceAmountDeduct;

    @Column(name = "final_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal PayableAmount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDateTime;

    @Column(name = "payment_status", length = 20)
    private String paymentStatus;

    public Payment() {
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public LocalDateTime getPeriodStart(){
        return periodStart;
    }

    public void setPeriodStart(LocalDateTime periodStart){
        this.periodStart=periodStart;
    }

    public LocalDateTime getPeriodEnd(){
        return periodEnd;
    }

    public void setPeriodEnd(LocalDateTime periodEnd){
        this.periodEnd=periodEnd;
    }

    public BigDecimal getTotalMilk() {
        return totalMilk;
    }

    public void setTotalMilk(BigDecimal totalMilk) {
        this.totalMilk = totalMilk;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getAdvanceAmountDeducted() {
        return advanceAmountDeduct;
    }

    public void setAdvanceAmountDeducted(BigDecimal advanceAmountDeduct) {
        this.advanceAmountDeduct = advanceAmountDeduct;
    }

    public BigDecimal getPayableAmount() {
        return PayableAmount;
    }

    public void setPayableAmount(BigDecimal PayableAmount) {
        this.PayableAmount = PayableAmount;
    }

    public LocalDateTime getPaymentDateTime() {
        return paymentDateTime;
    }

    public void setPaymentDate(LocalDateTime paymentDateTime) {
        this.paymentDateTime = paymentDateTime;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
