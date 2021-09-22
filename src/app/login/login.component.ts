import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

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
  temp  = ''

  customObs !: Observable<any>;
  subject = new Subject<any>();

  constructor(private router: Router, private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {

    // this.onMessage().subscribe(msg => {
    //     console.log(msg)
    // })


    // this.customObs = new Observable(sub => {
    //   sub.next(this.temp)
    // });
    // this.customObs.subscribe( data => {
    //   console.log("inside init method of test obs "+data)
    // }

    // ) 

  }

  // onMessage() : Observable<any> {
  //   return this.subject.asObservable();
  // }

  // handleLogin() {
  //   // if(this.username != 'Alex' && this.password !='dummy') {
  //   if (this.basicAuthenticationService.authenticate(this.username, this.password)) {
  //     this.router.navigate(['welcome', this.username])
  //     this.invalidLogin = false;
  //   } else {      
  //     this.invalidLogin = true;
  //   }
  // }

  // testObs() {
  //   this.subject.next(this.username)   
  //   console.log("empty test obs")
    
  // }


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
