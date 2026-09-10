package com.milkdairy.version1.payment;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment/accounts")
public class PaymentAccountController {

    private final PaymentAccountService paymentAccountService;

    public PaymentAccountController(
            PaymentAccountService paymentAccountService) {
        this.paymentAccountService = paymentAccountService;
    }

    @PostMapping("/{farmerId}")
    public void createAccount(
            @PathVariable Long farmerId,
            @RequestParam LocalDateTime supplyStartDateTime) {

        
        paymentAccountService.createAccount(farmerId, supplyStartDateTime);

        return;
    }

    @GetMapping("/{farmerId}")                                                                                                                                                              
    public ResponseEntity<PaymentAccount> getAccount(
            @PathVariable Long farmerId) {

        return ResponseEntity.ok(
                paymentAccountService.getAccount(farmerId));
    }
}
