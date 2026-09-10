package com.milkdairy.version1.fatrate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import com.milkdairy.version1.fatrate.FatRate;
//import com.milkdairy.version1.fatrate.FatRateService;

@RestController
@RequestMapping("/api/v1/fatrates")
public class FatRateController {

    private final FatRateService fatRateService;

    public FatRateController(FatRateService fatRateService) {
        this.fatRateService = fatRateService;
    }

    // get all active fatrate
    @GetMapping("/active")
    public ResponseEntity<List<FatRate>> getActiveRates() {

        return ResponseEntity.ok(
                fatRateService.getActiveRates()
        );
    }

    // get rate of fat on date 
    @GetMapping("/rate")
    public ResponseEntity<FatRate> getApplicableRate(
            @RequestParam BigDecimal fat,
            @RequestParam LocalDateTime date) {

        return ResponseEntity.ok(
                fatRateService.getApplicableRate(fat, date)
        );
    }

    // create new fat rate
    @PostMapping("/operator/add")
    public List<FatRate> createNewRate(
            @RequestBody List<FatRate> fatRate) {


        return fatRateService.createNewRate(fatRate);
    }


}