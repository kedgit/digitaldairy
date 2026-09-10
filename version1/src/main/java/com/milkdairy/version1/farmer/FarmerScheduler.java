package com.milkdairy.version1.farmer;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FarmerScheduler {

    private final FarmerService farmerService;

    public FarmerScheduler(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @Scheduled(cron = "0 0 1 * * *", zone = "Asia/Kolkata")
    public void deactivateInactiveFarmers() {

        farmerService.deactivateInactiveFarmers();
    }
}