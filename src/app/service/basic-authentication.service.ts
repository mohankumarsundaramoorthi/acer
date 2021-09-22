import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticatedUser";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  // @Output() username: EventEmitter<any> = new EventEmitter();
  public username = '';

  // public userNameSub : BehaviorSubject<any> = new BehaviorSubject('default value');

  // public userNameObs = new Observable(sub => sub.next(this.username));

  public subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderStr = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderStr
    });
    console.log("in execute hello word service" + basicAuthHeaderStr);
    return this.httpClient.get<AuthenticationBean>(`${API_URL}/con/basicauth/`,
      { headers }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderStr);
            return data;
          }
        )
      );
  }

  executeJWTAuthenticationService(username: string, password: string) {

    return this.httpClient.post<any>(`${API_URL}/con/authenticate`,
      {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);            
            this.username = username;
            this.subject.next();
            // this.username.emit(username);
            return data;
          }
        )
      );
  }

  executeJWTCreateAuthenticationService(user: UserBean) {
    console.log(`in jwt create auth service ${user}`)
    return this.httpClient.post<any>(`${API_URL}/con/createUser`, user);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  // getAuthenticatedUserAsObservable(): Observable<any> {
  //   return new Observable(sub => sub.next(this.username));
  // }

  getAuthenticatedUserAsSubject() : Observable<any> {
    return this.subject.asObservable();
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
    return null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {
  constructor(public message: string) { }
}

export class UserBean {
  constructor(public username: string, public password: string) { }
}
