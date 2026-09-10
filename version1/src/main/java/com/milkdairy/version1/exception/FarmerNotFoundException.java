package com.milkdairy.version1.exception;

public class FarmerNotFoundException extends RuntimeException {
    public FarmerNotFoundException(String message) {
        super(message);
    }
}
