package com.milkdairy.version1.milkentry;

import java.time.LocalDateTime;
import java.math.BigDecimal; 
public class MilkEntryResponse {
    
    private LocalDateTime date;
    private String session;
    private BigDecimal quantity;
    private BigDecimal fatContent;
    private BigDecimal rate;
    private BigDecimal amount;

    public MilkEntryResponse() {

    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getFatContent() {
        return fatContent;
    }

    public void setFatContent(BigDecimal fatContent) {
        this.fatContent = fatContent;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

}
