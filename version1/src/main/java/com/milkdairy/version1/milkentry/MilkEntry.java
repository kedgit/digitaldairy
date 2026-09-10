package com.milkdairy.version1.milkentry;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.*;

@Entity
@DynamicInsert
@Table(name = "milk_entry")
public class MilkEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private Long entryId;

    @JoinColumn(name = "farmer_id", nullable = false)
    private Long farmerId;

    @Column(name = "session", nullable = false)
    private String session;

    @Column(name = "quantity_liter", precision = 10, scale = 2, nullable = false)
    private BigDecimal quantityLiter;

    @Column(name = "fat", precision = 3, scale = 1, nullable = false)
    private BigDecimal fat;

    @Column(name = "rate_per_liter", precision = 10, scale = 2, nullable = false)
    private BigDecimal ratePerLiter;

    @Column(name = "entry_date_time")
    private LocalDateTime entryDateTime;

    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    public MilkEntry(){

    }

    public Long getEntryId() {
        return entryId;
    }

    public void setEntryId(Long entryId) {
        this.entryId = entryId;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public BigDecimal getQuantityLiter() {
        return quantityLiter;
    }

    public void setQuantityLiter(BigDecimal quantityLiter) {
        this.quantityLiter = quantityLiter;
    }

    public BigDecimal getFat() {
        return fat;
    }

    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }

    public BigDecimal getRatePerLiter() {
        return ratePerLiter;
    }

    public void setRatePerLiter(BigDecimal ratePerLiter) {
        this.ratePerLiter = ratePerLiter;
    }

    public LocalDateTime getEntryDateTime() {
        return entryDateTime;
    }

    public void setEntryDateTime(LocalDateTime entryDateTime) {
        this.entryDateTime = entryDateTime;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    

    
}