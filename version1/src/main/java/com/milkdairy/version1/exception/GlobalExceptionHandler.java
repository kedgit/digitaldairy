package com.milkdairy.version1.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.milkdairy.version1.ApiResponse.CentralApiResponse;


@RestControllerAdvice
public class GlobalExceptionHandler {

     @ExceptionHandler(FarmerNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleFarmerNotFound(FarmerNotFoundException ex) {
        
        ErrorResponse response= new ErrorResponse(
            LocalDateTime.now().withNano(0),
            404,
            "Farmer Not Found",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        
    }

    @ExceptionHandler(FatRateNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleFatRateNotFound (FatRateNotFoundException ex) {
        ErrorResponse response= new ErrorResponse(
        LocalDateTime.now().withNano(0),
            404,
            "Fat Rate Not Found",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(PaymentAccountNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePaymentAccountNotFound(PaymentAccountNotFoundException ex) {

       ErrorResponse response= new ErrorResponse(
        LocalDateTime.now().withNano(0),
            404,
            "Payment Account Not Found",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CentralApiResponse<Void>> handleException(Exception ex) {

        CentralApiResponse<Void> response =
                new CentralApiResponse<>(
                        500,
                        "Internal server error",
                        null
                );

        return ResponseEntity.ok(response);
                
    }
    

}
