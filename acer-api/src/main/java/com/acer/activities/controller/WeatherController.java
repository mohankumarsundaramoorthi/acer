package com.acer.activities.controller;

import com.acer.activities.data.Weather;
import com.acer.activities.service.WeatherProxyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class WeatherController {
    
    @Autowired
    private WeatherProxyService weatherProxyService;

    @GetMapping("/weather/{city}")
    public Weather getWeather(@PathVariable String city) {
        System.out.println("inside get weather "+city);
        Weather proxyWeather = weatherProxyService.retrieveWeather(city);
        Weather weather =  new Weather();
        weather.setId(proxyWeather.getId());
        weather.setCity(proxyWeather.getCity());
        weather.setEnvironment(proxyWeather.getEnvironment());
        weather.setTemperature(proxyWeather.getTemperature());
        return weather;
    }

    @GetMapping("weather/cities")
    public List<String> getCities() {
        weatherProxyService.retrieveCities();
        return weatherProxyService.retrieveCities();
    }

}
