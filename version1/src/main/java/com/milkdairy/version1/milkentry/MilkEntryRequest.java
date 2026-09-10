package com.milkdairy.version1.milkentry;

import java.math.BigDecimal;

//import java.time.LocalDateTime;

public class MilkEntryRequest {

    private Long farmerId;
    private String session;
    
    private BigDecimal fat;
    private BigDecimal quantityLiter;


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

    public BigDecimal getFat() {
        return fat;
    }

    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }


    public BigDecimal getQuantityLiter() {
        return quantityLiter;
    }

    public void setQuantityLiter(BigDecimal quantityLiter) {
        this.quantityLiter = quantityLiter;
    }
}

