import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  userBean : LogInBean = {"isUserLoggedIn": false, "showContent": true};
  private isUserLoggedIn = new BehaviorSubject(this.userBean);

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeLoggedInStatus(status: LogInBean) {
    this.isUserLoggedIn.next(status);
  }
  
  getLoggedInStatus() {
    return this.isUserLoggedIn.asObservable();
  }

}

export class LogInBean {
  constructor(public isUserLoggedIn: boolean, public showContent: boolean) { }
}
