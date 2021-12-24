package com.acer.activities.controller;

import com.acer.activities.data.HelloWorldBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class BasicAuthController {

    @Autowired
    private HelloWorldBean helloWorldBean;

    @GetMapping(path ="/str")
    public String getB() {
        return "dd";
    }

    
    @GetMapping(path ="/message/{name}")
    public HelloWorldBean getMessagePathVariable(@PathVariable String name) {
        helloWorldBean.setMessage("Hello  "+name + " from Spring boot server");
        return helloWorldBean;
    }

}
