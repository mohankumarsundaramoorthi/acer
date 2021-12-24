package com.acer.activities.service;

import com.acer.activities.data.Weather;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="weather-data")
public interface WeatherProxyService {

    @GetMapping("/weather-data/{city}")
    public Weather retrieveWeather(@PathVariable String city) ;

    @GetMapping("weather-data/cities")
    public List<String> retrieveCities();

}
