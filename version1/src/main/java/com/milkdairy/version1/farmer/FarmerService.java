package com.milkdairy.version1.farmer;

import org.springframework.transaction.annotation.Transactional;

import com.milkdairy.version1.exception.FarmerNotFoundException;
import com.milkdairy.version1.exception.FatRateNotFoundException;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FarmerService {

    
    private final FarmerRepository farmerRepository;

    public FarmerService (FarmerRepository farmerRepository){
        this.farmerRepository=farmerRepository;
    }

    // add farmer
   
    public FarmerResponse addFarmer(FarmerRequest request) {

    Farmers farmer = new Farmers();
    
    farmer.setUserId(request.getUserId());
    farmer.setFarmerCode(request.getFarmerCode());
    farmer.setFarmerName(request.getFarmerName());
    farmer.setMobileNo(request.getMobileNo());
    farmer.setAddress(request.getAddress());
    farmer.setActive(true);

    Farmers savedFarmer = farmerRepository.save(farmer);

    // savedFarmer.setFarmerCode(
    //     String.format("F%03d", savedFarmer.getFarmerId())
    // );

    FarmerResponse response = new FarmerResponse();

    response.setFarmerId(savedFarmer.getFarmerId());
    response.setFarmerCode(savedFarmer.getFarmerCode());
    response.setFarmerName(savedFarmer.getFarmerName());
    response.setMobileNo(savedFarmer.getMobileNo());
    response.setAddress(savedFarmer.getAddress());
    response.setActive(savedFarmer.isActive());

    return response;
}

    // get farmer detail logged user self
    public FarmerResponse getFarmerByUserId(Long userId){
        Farmers farmer= farmerRepository.findByUserId(userId).orElse(null);
        
        FarmerResponse response = new FarmerResponse();

        response.setFarmerId(farmer.getFarmerId());
        response.setFarmerCode(farmer.getFarmerCode());
        response.setFarmerName(farmer.getFarmerName());
        response.setMobileNo(farmer.getMobileNo());
        response.setAddress(farmer.getAddress());
        response.setActive(farmer.isActive());

        return response;
    }


    // get all active farmers
    public List<FarmerResponse> getAllActiveFarmers(){
        List<Farmers> farmers = farmerRepository.findByIsActiveTrue();
        return farmers.stream().map(farmer -> {
            FarmerResponse response= new FarmerResponse();
            response.setFarmerId(farmer.getFarmerId());
            response.setFarmerCode(farmer.getFarmerCode());
            response.setFarmerName(farmer.getFarmerName());
            response.setMobileNo(farmer.getMobileNo());
            response.setAddress(farmer.getAddress());
            response.setActive(farmer.isActive());
            
            return response;
        }).toList();

       
    }

    // update farmer
    public FarmerResponse updateFarmer(
        String farmerCode,
        FarmerUpdateRequest request) {

    Farmers farmer = farmerRepository.findByFarmerCode(farmerCode)
            .orElseThrow(() ->
                    new FarmerNotFoundException("Farmer not found"));

    farmer.setFarmerName(request.getFarmerName());
    farmer.setMobileNo(request.getMobileNo());
    farmer.setAddress(request.getAddress());

    Farmers updatedFarmer = farmerRepository.save(farmer);

    FarmerResponse response = new FarmerResponse();

    response.setFarmerId(updatedFarmer.getFarmerId());
    response.setFarmerCode(updatedFarmer.getFarmerCode());
    response.setFarmerName(updatedFarmer.getFarmerName());
    response.setMobileNo(updatedFarmer.getMobileNo());
    response.setAddress(updatedFarmer.getAddress());
    response.setActive(updatedFarmer.isActive());

    return response;
}
    // update farmer profile logged user self
    public FarmerResponse updateFarmerProfile(
        Long userId,
        FarmerUpdateRequest request) {
            Farmers farmer = farmerRepository.findByUserId(userId).orElseThrow(()-> new FatRateNotFoundException("Farmer Not Found..."));
            if (farmer == null) {
                throw new FatRateNotFoundException("Farmer not found");
            }
            // Update the farmer's information based on the request
            farmer.setFarmerName(request.getFarmerName());
            farmer.setMobileNo(request.getMobileNo());
            farmer.setAddress(request.getAddress());

            Farmers updatedFarmer = farmerRepository.save(farmer);

            FarmerResponse response = new FarmerResponse();
            response.setFarmerId(updatedFarmer.getFarmerId());
            response.setFarmerCode(updatedFarmer.getFarmerCode());
            response.setFarmerName(updatedFarmer.getFarmerName());
            response.setMobileNo(updatedFarmer.getMobileNo());
            response.setAddress(updatedFarmer.getAddress());
            response.setActive(updatedFarmer.isActive());

            return response;
        }
    
    // make active in future come back farmer
    public void makeActive(Long id){
        Farmers farmers = farmerRepository.findById(id).orElseThrow(()-> new FarmerNotFoundException("Farmer Not Found..."));
        farmers.setActive(true);
        farmerRepository.save(farmers);
    }

    // deactivate auto after seven day not supply milk
    @Transactional
    public void deactivateInactiveFarmers() {

        LocalDate cutoffDate = LocalDate.now().minusDays(7);

        int count = farmerRepository.deactivateFarmersWithoutMilk(cutoffDate);

        System.out.println(count + " farmers marked inactive");
}

}
