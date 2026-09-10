package com.milkdairy.version1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        return userService.register(request);
    }

    @PostMapping("/admin/addoperator")
    public String addOperator(@RequestBody RegisterRequest request){
        userService.addOperator(request);
        return "Operator Added Successfuly...";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        return userService.login(request);
    }

    @PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(
        @RequestParam String email) {

    userService.forgotPassword(email);

    return ResponseEntity.ok(
        "If the email is registered, a password reset link has been sent."
    );
}

@PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(
        @RequestParam String token,
        @RequestParam String newPassword) {

    String message =
            userService.resetPassword(token, newPassword);

    return ResponseEntity.ok(message);
}

}