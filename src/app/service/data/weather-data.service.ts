import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';

export interface WeatherData{
  id: number;
  city: string;
  temperature: string;
  env: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private httpClient: HttpClient) { } 

  getWeatherData(city: string){
    return this.httpClient.get<WeatherData>(`${API_URL}/con/weather/${city}`)
  }

  getCities(){
    return this.httpClient.get<string[]>(`${API_URL}/con/weather/cities`)
  }
}
