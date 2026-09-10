package com.milkdairy.version1.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/calculate/{farmerId}")
    public ResponseEntity<Payment> makePayment(
            @PathVariable Long farmerId) {

        Payment payment =
                paymentService.makePayment(farmerId);

        return ResponseEntity.ok(payment);
    }

    @PostMapping("/make/{farmerId}")
    public ResponseEntity<Payment> savePayment(
            @PathVariable Long farmerId) {

        Payment savedPayment = paymentService.savePayment(farmerId);

        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/history/{farmerId}")
    public List<Payment> getPaymentHistory(@PathVariable Long farmerId) {

        return paymentService.getPaymentHistory(farmerId);
    }


}
