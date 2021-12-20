package com.test.weather.repository;

import com.test.weather.data.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherDataRepository extends JpaRepository<WeatherData, Long> {
    WeatherData findByCity(String city);

}

