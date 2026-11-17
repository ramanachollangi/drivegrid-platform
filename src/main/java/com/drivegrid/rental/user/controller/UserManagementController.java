package com.drivegrid.rental.user.controller;

import com.drivegrid.rental.user.dto.UserRegistration;
import com.drivegrid.rental.user.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @PostMapping("/registerUser")
    public ResponseEntity<Object> createUser(@RequestBody UserRegistration user){
        userManagementService.createUserService(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully"));
    }

    @GetMapping("/getUser")
    public UserRegistration fetchUser(@RequestParam Long userId){
      return userManagementService.fetchUser(userId);
    }



}

