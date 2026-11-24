package com.drivegrid.rental.user.controller;

import com.drivegrid.rental.user.dto.UserLogin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUserCredentials(@RequestBody UserLogin userLogin){
      Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.email(), userLogin.password()));
      if(authentication.isAuthenticated()){
          return ResponseEntity.ok().body("Login Succssful");
      }
      return ResponseEntity.ok().body("Login not SuccessFull");
  }

}
