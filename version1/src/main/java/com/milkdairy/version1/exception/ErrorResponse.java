package com.milkdairy.version1.exception;

import java.time.LocalDateTime;

public class ErrorResponse {

    private LocalDateTime datetime;
    private int status;
    private String error;
    private String message;

    public ErrorResponse (LocalDateTime datetime,int status,String error, String message ){
       this.datetime = datetime;
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public LocalDateTime getDateTime() {
        return datetime;
    }
    public void setTime(LocalDateTime datetime) {
        this.datetime = datetime;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getError() {
        return error;
    }
    public void setError(String error) {
        this.error = error;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    

    

}
