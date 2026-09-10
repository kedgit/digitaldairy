package com.milkdairy.version1.farmer;

//import com.milkdairy.version1.farmer.Farmers;
//import com.milkdairy.version1.farmer.FarmerService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.milkdairy.version1.security.CustomUserDetails;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/farmer")
public class FarmerController {

    
    private final FarmerService farmerService;

    // constructor injection
    public FarmerController(FarmerService farmerService){
        this.farmerService=farmerService;
    }

    // @GetMapping("/code/{farmerCode}")
    // public ResponseEntity<FarmerResponse> getFarmerByFarmerCode(@PathVariable String farmerCode){
    //     FarmerResponse farmers= farmerService.getFarmerByFarmerCode(farmerCode);

    //     if(farmers==null){
    //         return ResponseEntity.notFound().build();
    //     }
    //     return ResponseEntity.ok(farmers);
    // }

    @GetMapping("/profile")
    public ResponseEntity<FarmerResponse> getFarmerProfile(
        Authentication authentication) {

        CustomUserDetails userDetails =
            (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getUserId();

        FarmerResponse farmer =
            farmerService.getFarmerByUserId(userId);

        if (farmer == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(farmer);
    }

    // all active farmers
    @GetMapping("/active")
    public ResponseEntity<List<FarmerResponse>> getAllActiveFarmers(){
        List<FarmerResponse> farmers = farmerService.getAllActiveFarmers();
        return ResponseEntity.ok(farmers);
    }

    // add farmer
    // @PostMapping("/addfarmer")
    // public FarmerResponse addFarmer(@RequestBody FarmerRequest farmers){
    //     return farmerService.addFarmer(farmers);
    // }

    // make inactive instead delete
    @PutMapping("/inactive/{id}")
    public ResponseEntity<String> makeInactive ( @PathVariable Long id){
        farmerService.makeActive(id);
        return ResponseEntity.ok("Farmer marked InActive Successfuly...");
    }

    // update farmer data (partial)
    @PatchMapping("/profile")
    public ResponseEntity<FarmerResponse> updateFarmerProfile(
        Authentication authentication,
        @RequestBody FarmerUpdateRequest farmerUpdateRequest) {

        CustomUserDetails userDetails =
            (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getUserId();

        FarmerResponse updatedFarmer =
            farmerService.updateFarmerProfile(userId, farmerUpdateRequest);

        return ResponseEntity.ok(updatedFarmer);
    }
   
    @PatchMapping("/update/{farmerCode}")
public ResponseEntity<FarmerResponse> updateFarmer(
        @PathVariable String farmerCode,
        @RequestBody FarmerUpdateRequest farmer) {

    FarmerResponse updatedFarmer =
            farmerService.updateFarmer(farmerCode, farmer);

    return ResponseEntity.ok(updatedFarmer);
}
        
}
    

