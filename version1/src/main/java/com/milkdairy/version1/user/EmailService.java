package com.milkdairy.version1.user;

import java.math.BigDecimal;
import java.time.LocalDateTime;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender){
        this.mailSender=mailSender;
    }

    public void sendRegistrationEMail(String email,String username){
        SimpleMailMessage message =new SimpleMailMessage();
        message.setFrom("mhetreked0745@gmail.com");
        message.setTo(email);
        message.setSubject("Registration Successful! Welcome to Milk Dairy Management System.");
        message.setText("Hello " + username + ",\n" +
                        "Your registration was successful! 🎉\n" +
                        "Welcome to Milk Dairy Management System.\n" +
                        "You can now log in and start using your account.\n\n" +
                        "Thank you,\n" +
                        "Milk Dairy Management Team");
        mailSender.send(message);
        
    }

    public void sendResetPasswordMail(String email, String resetUrl) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom("mhetreked0745@gmail.com");
    message.setTo(email);
    message.setSubject("Reset Your Password - Milk Dairy");

    message.setText(
        "Hello,\n\n" +
        "We received a request to reset your password.\n\n" +
        "Reset your password using the link below:\n" +
        resetUrl + "\n\n" +
        "This link will expire in 15 minutes.\n\n" +
        "If you didn't request this, please ignore this email.\n\n" +
        "Thank you,\n" +
        "Milk Dairy Management Team"
    );

    mailSender.send(message);
}

    // payemnt mail
    public void sendPaymentSuccessfulMail(
        String email,
        String userNmae,
        LocalDateTime fromDate,
        LocalDateTime toDate,
        LocalDateTime paymentDate,
        BigDecimal amount) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom("mhetreked0745@gmail.com");
    message.setTo(email);
    message.setSubject("Payment Successful - Milk Dairy");

    message.setText(
        "Hello Farmer" + ",\n\n" +
        "Your milk payment has been successfully processed.\n\n" +

        "Payment Details:\n" +
        "Payment Period: " + fromDate + " to " + toDate + "\n" +
        "Payment Date: " + paymentDate + "\n" +
        "Amount: ₹" + amount + "\n\n" +

        "This payment covers your milk supply from " +
        fromDate + " to " + toDate + ".\n\n" +

        "Thank you for supplying milk to our dairy.\n\n" +
        "Regards,\n" +
        "Milk Dairy Management Team"
    );

    mailSender.send(message);
}

}
