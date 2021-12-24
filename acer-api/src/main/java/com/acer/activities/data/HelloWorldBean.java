package com.acer.activities.data;

import org.springframework.stereotype.Component;

@Component
public class HelloWorldBean {

    private String message;

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "AuthenticationBean{message='" + message + '\'' + '}';
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
