package com.example.basicauth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class BasicAuthController {

    @GetMapping(path ="/str")
    public String getB() {
        return "dd";
    }

    @GetMapping(path ="/basicauth")
    public AuthenticationBean getMessage() {
        return new AuthenticationBean("You are authenticated");
//        throw new RuntimeException("Some error happend");
    }

    @GetMapping(path ="/message/{name}")
    public AuthenticationBean getMessagePathVariable(@PathVariable String name) {
        return new AuthenticationBean("Hello  "+name + " from Spring boot server");
    }

}
