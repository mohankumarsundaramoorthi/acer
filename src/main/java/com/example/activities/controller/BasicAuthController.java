package com.example.activities.controller;

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

    
    @GetMapping(path ="/message/{name}")
    public HelloWorldBean getMessagePathVariable(@PathVariable String name) {
        return new HelloWorldBean("Hello  "+name + " from Spring boot server");
    }

}
