import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER, BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { LogInBean, SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: any;  

  constructor(public hardCodedAuthService: HardCodedAuthenticationService, private basicAuthService: BasicAuthenticationService, private sharedData: SharedDataService, private router:Router) { }

  ngOnInit(): void {
    console.log("initializing menu component")
    // this.basicAuthService.userNameObs.subscribe(data => {
    //   this.username = this.basicAuthService.getAuthenticatedUser();
    //   console.log("inside on init menu component "+data);
    // })

    this.basicAuthService.getAuthenticatedUserAsSubject().subscribe(() => {
      this.username = this.basicAuthService.getAuthenticatedUser();
    })
    if (typeof this.username === 'undefined') {
      this.username = this.basicAuthService.getAuthenticatedUser();
    }
  }

  onLoginClick() {    
    this.sharedData.changeLoggedInStatus({isUserLoggedIn:true,showContent:false});
    this.router.navigate(['/login']);
  }


}
