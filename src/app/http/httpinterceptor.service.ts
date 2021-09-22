import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor(private basicAuthService : BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let username = 'user';
    // let password = 'dummy';
    // let basicAuthHeaderStr = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthHeaderStr = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();
    if(basicAuthHeaderStr && username){
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderStr
        }
      })
    }   
    return next.handle(req);
  }
}
