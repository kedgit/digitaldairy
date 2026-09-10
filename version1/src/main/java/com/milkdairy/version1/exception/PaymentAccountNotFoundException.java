package com.milkdairy.version1.exception;

public class PaymentAccountNotFoundException extends RuntimeException{
    public PaymentAccountNotFoundException(String message){
        super(message);
    }
}
