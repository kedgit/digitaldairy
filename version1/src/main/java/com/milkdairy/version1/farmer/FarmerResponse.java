package com.milkdairy.version1.farmer;

public class FarmerResponse {

    private Long farmerId;
    private String farmerCode;
    private String farmerName;
    private String mobileNo;
    private String address;
    private boolean isActive;
    
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
    public void setAddress(String address) {
        this.address = address;
    }
    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    // getters and setters
}
