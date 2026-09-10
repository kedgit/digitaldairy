package com.milkdairy.version1.fatrate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "fat_rate")
@DynamicInsert
public class FatRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fat_rate_id")
    private Long fatRateId;

    @Column(name = "fat", precision = 3, scale = 1, nullable = false)
    private BigDecimal fat;

    @Column(name = "rate_per_liter", precision = 10, scale = 2, nullable = false)
    private BigDecimal ratePerLiter;

    @Column(name = "effective_from")
    private LocalDateTime effectiveFrom;

    @Column(name = "is_active")
    private Boolean isActive;

    public FatRate() {
    }

    public Long getFatRateId() {
        return fatRateId;
    }

    public void setFatRateId(Long fatRateId) {
        this.fatRateId = fatRateId;
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

    public LocalDateTime getEffectiveFrom() {
        return effectiveFrom;
    }

    public void setEffectiveFrom(LocalDateTime effectiveFrom) {
        this.effectiveFrom = effectiveFrom;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}