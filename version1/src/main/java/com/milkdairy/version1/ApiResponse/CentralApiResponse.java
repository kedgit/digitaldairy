package com.milkdairy.version1.ApiResponse;

public class CentralApiResponse<T> {
    private int statusCode;
    private String message;
    private T body;
    // private double amount;

    public CentralApiResponse(int statusCode,String message,T body){
        this.statusCode=statusCode;
        this.message=message;
        this.body=body;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }

    


}
