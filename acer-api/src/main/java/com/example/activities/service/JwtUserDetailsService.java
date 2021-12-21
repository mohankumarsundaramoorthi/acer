package com.example.activities.service;

import com.example.activities.data.JwtUserDetails;
import com.example.activities.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private JwtUserDetails jwtUserDetails;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var userDetailsOptional = userDetailsRepository.findByUserName(username);
        userDetailsOptional.orElseThrow(() -> new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username)));
        var userDetails = userDetailsOptional.get().stream().findFirst().get();
        var authorities = new ArrayList<SimpleGrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(userDetails.getRole()));
        jwtUserDetails.setId(userDetails.getId());
        jwtUserDetails.setUsername(userDetails.getUserName());
        jwtUserDetails.setPassword(userDetails.getEncodedPassword());
        jwtUserDetails.setAuthorities(authorities);
        return jwtUserDetails;
    }

}


