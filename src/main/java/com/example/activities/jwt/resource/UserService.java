package com.example.activities.jwt.resource;

import com.example.activities.jwt.JwtInMemoryUserDetailsService;
import com.example.activities.jwt.JwtUserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    static long counter = 3L;

    public long createUser(String username, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedStr = encoder.encode(password);
        JwtUserDetails jwtUserDetails = new JwtUserDetails(counter++, username,
                encodedStr, "ROLE_USER_"+counter);
        new JwtInMemoryUserDetailsService().setInMemoryUserList(jwtUserDetails);
        return counter;
    }
}
