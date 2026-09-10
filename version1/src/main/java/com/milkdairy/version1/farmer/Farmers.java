package com.milkdairy.version1.farmer;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.*;

@Entity
@Table(name = "farmer")
@DynamicInsert
public class Farmers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "farmer_code", nullable = false, unique = true)
    private String farmerCode;

    @Column(name = "farmer_name", nullable = false)
    private String farmerName;

    @Column(name = "mobile_no", length = 10)
    private String mobileNo;

    @Column(name = "address")
    private String address;

    @Column(name ="is_active")
    private boolean isActive;
    
    public Farmers() {
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getFarmerCode() {
        return farmerCode;
    }

    public void setFarmerCode(String farmerCode) {
        this.farmerCode = farmerCode;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getAddress() {
        return address;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}