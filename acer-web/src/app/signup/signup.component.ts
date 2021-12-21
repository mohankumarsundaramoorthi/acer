import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  
  username = '';
  password = '';
  userCreated = false;
  
  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  createUserLogin() {
    this.basicAuthenticationService.executeJWTCreateAuthenticationService({
      username: this.username,
      password: this.password
    })
      .subscribe(
        data => {
          console.log(data)
          this.userCreated = true;
        },
        error => {
          console.error(error)
          this.userCreated = false;
        }
      )
  }

}
