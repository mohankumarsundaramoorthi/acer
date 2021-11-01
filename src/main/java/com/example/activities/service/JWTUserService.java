package com.example.activities.service;

import com.example.activities.data.JwtUserDetails;
import com.example.activities.entity.UserDetails;
import com.example.activities.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JWTUserService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private UserDetails userDetails;

    @Autowired
    private JwtUserDetails jwtUserDetails;

    public long createUser(String username, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedStr = encoder.encode(password);
        userDetails.setUserName(username);
        userDetails.setEncodedPassword(encodedStr);
        String role_user = "ROLE_USER";
        userDetails.setRole(role_user);
        userDetailsRepository.save(userDetails);
        return userDetails.getId();
    }
}
