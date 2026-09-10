package com.milkdairy.version1.user;

import com.milkdairy.version1.security.JwtService;

import java.time.LocalDateTime;
import java.util.UUID;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.milkdairy.version1.farmer.*;
@Service
public class UserService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetTokenRepository  passwordResetTokenRepository;
    private final FarmerService farmerService;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder, JwtService jwtService,
        EmailService emailService, PasswordResetTokenRepository  passwordResetTokenRepository,FarmerService farmerService) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService = jwtService;
        this.emailService=emailService;
        this. passwordResetTokenRepository= passwordResetTokenRepository;
        this.farmerService=farmerService;
    }

    public User register(RegisterRequest request) {

        if (request.getUsername() == null || request.getUsername().isBlank()) {

            throw new RuntimeException("Username is required");
        }

        if(request.getEmail() == null || request.getEmail().isBlank()){
            throw new RuntimeException("Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {

            throw new RuntimeException("Password is required");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);

        User savedUser = userRepository.save(user);
        
        // send registration complete mail

        emailService.sendRegistrationEMail(user.getEmail(),user.getUsername());

        // farmer profile create

        FarmerRequest farmerRequest = new FarmerRequest();

        farmerRequest.setUserId(savedUser.getUserId());
        farmerRequest.setFarmerCode(String.format("F%03d", savedUser.getUserId()));
        farmerRequest.setFarmerName(request.getUsername());
        farmerRequest.setMobileNo(request.getMobileNo());
        farmerRequest.setAddress(request.getAddress());

        farmerService.addFarmer(farmerRequest);

        return savedUser;
    }

    public String addOperator(RegisterRequest request){
        User user= new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.OPERATOR);
        userRepository.save(user);
        return "Operator Added Successfuly...";
    }

    public String login(LoginRequest request) {

       User user = userRepository
            .findByUsernameOrEmail(
                    request.getLogin(),
                    request.getLogin()
            )
            .orElseThrow(() ->
                    new RuntimeException("Invalid username/email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user);
    }

    public void forgotPassword(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("Forgot password request for: "
            + user.getEmail());

    // Next:
    // generate reset token
    String token = UUID.randomUUID().toString();
    // expiry time
    LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(15);

    // create request
    PasswordResetToken resetToken = new PasswordResetToken(token,user,expiryTime);
    

    // save token

    passwordResetTokenRepository.save(resetToken);
     System.out.println("Reset Token: " + token);
    System.out.println("Expiry: " + expiryTime);

    // send reset email
    String  resetUrl = "http://localhost:5173/reset-password?token=" + token;

    System.out.println("Reset URL: " + resetUrl);
    
    emailService.sendResetPasswordMail(
            user.getEmail(),
            resetUrl
    );


    }

    // password reset
    public String resetPassword(String token, String newPassword) {

    PasswordResetToken resetToken =
            passwordResetTokenRepository.findByToken(token)
            .orElseThrow(() ->
                    new RuntimeException("Invalid reset token"));

    // Check token expiry
    if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {

        passwordResetTokenRepository.delete(resetToken);

        throw new RuntimeException("Reset token has expired");
    }

    // Get user
    User user = resetToken.getUser();

    // Encode new password
    user.setPassword(passwordEncoder.encode(newPassword));

    // Save updated user
    userRepository.save(user);

    // Delete token so it cannot be used again
    passwordResetTokenRepository.delete(resetToken);

    return "Password reset successfully";
}

}