package com.milkdairy.version1.payment;

import  java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
public class AdvancePaymentController {

    private final AdvancePaymentService advancePaymentService;

    public AdvancePaymentController(AdvancePaymentService advancePaymentService) {
        this.advancePaymentService = advancePaymentService;
    }

    // give advance to farmer
    @PostMapping("/advance/farmer")
    public ResponseEntity<AdvancePayment> takeAdvance(
            @RequestBody AdvancePayment request) {

        AdvancePayment advance = advancePaymentService.takeAdvance(request);
                

        return ResponseEntity.ok(advance);
    }

    @GetMapping("/advances/{farmerId}")
    
    public ResponseEntity<List<AdvancePayment>> getAdvancesByFarmerId(
            @PathVariable Long farmerId) {

        List<AdvancePayment> advances =
                advancePaymentService.getAdvancesByFarmerId(farmerId);

        return ResponseEntity.ok(advances);
    }
}
