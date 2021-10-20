import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;
  userCreated = false;
  temp = ''
  isLoggedInClicked !: boolean;
  showContent !: boolean;

  customObs !: Observable<any>;
  subject = new Subject<any>();

  constructor(private router: Router, private basicAuthenticationService: BasicAuthenticationService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.getLoggedInStatus().subscribe(status => {
      this.isLoggedInClicked = status.isUserLoggedIn;
      this.showContent = status.showContent;
    })
  }

  showLogin() {
    if (this.basicAuthenticationService.isUserLoggedIn()) {
      console.log(`User namme is ${this.username}`);
      
      this.router.navigate(['welcome', this.username])
    } else {
      this.isLoggedInClicked = true;
      this.showContent = false;
    }

  }

  handleLogin() {
    // if(this.username != 'Alex' && this.password !='dummy') {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        },
        error => {
          console.error(error)
          this.invalidLogin = true;
        }
      )
  }

  handleJWTAuthLogin() {
    // if(this.username != 'Alex' && this.password !='dummy') {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        },
        error => {
          console.error(error)
          this.invalidLogin = true;
        }
      )
  }

}
