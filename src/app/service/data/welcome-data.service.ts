import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean {
  constructor(public message: String) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private httpClient: HttpClient) {
  }

  executeHelloWorld() {
    return this.httpClient.get<HelloWorldBean>(`${API_URL}/con/message`);
  }

  executeHelloWorldWithPathVariable(name: string) {    
    return this.httpClient.get<HelloWorldBean>(`${API_URL}/con/message/${name}`);
  }

}
