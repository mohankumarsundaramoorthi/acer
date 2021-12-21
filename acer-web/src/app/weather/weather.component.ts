import { Component, OnInit } from '@angular/core';
import { WeatherData, WeatherDataService } from '../service/data/weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  weatherData !: WeatherData;
  selectedLevel: any;
  cities !: string[];

  constructor(private welcomeDataService: WeatherDataService) { }

  ngOnInit(): void {
    this.welcomeDataService.getCities().subscribe(
      data => {
        console.log(data);
        this.cities = data;
      }
    )
  }

  getWeather() {
    if (this.selectedLevel) {
      console.log(this.selectedLevel);
      this.welcomeDataService.getWeatherData(this.selectedLevel).subscribe(
        response => this.weatherData = response
      );
    } else {
      this.weatherData.temperature='';
    }
  }

}
