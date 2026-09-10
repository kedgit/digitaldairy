package com.milkdairy.version1.farmer;

public class FarmerRequest {

    private Long userId;
    private String farmerCode;
    private String farmerName;
    private String mobileNo;
    private String address;
   
    
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
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    
}
