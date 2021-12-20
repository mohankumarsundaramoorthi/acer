package com.test.weather.controller;

import com.test.weather.data.WeatherData;
import com.test.weather.repository.WeatherDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class WeatherDataController {

    @Autowired
    private WeatherDataRepository weatherDataRepository;

    @Autowired
    private Environment environment;

    private Logger logger = LoggerFactory.getLogger(WeatherDataController.class);

    @GetMapping("/weather-data/{city}")
    public WeatherData getWeatherData(@PathVariable String city) {
        logger.info("retrieve weather data called for {}", city);
        WeatherData weatherData = weatherDataRepository.findByCity(city);
        if (weatherData == null) {
            throw new RuntimeException("Unable to Find data for " + city);
        }
        String port = environment.getProperty("local.server.port");
        weatherData.setEnvironment(port);
        logger.info("WeatherDAta retrieved {}",weatherData.getTemperature());
        return weatherData;
    }

    @GetMapping("/weather-data/cities")
    public List<String> getCities() {
        logger.info("retrieving all cities");
        List<WeatherData> weatherData = weatherDataRepository.findAll();
        if (weatherData.isEmpty()) {
            throw new RuntimeException("Unable to Find data");
        }
        logger.info("Cities retrieved");
        return weatherData.stream().map(WeatherData::getCity).collect(Collectors.toList());
    }

}
