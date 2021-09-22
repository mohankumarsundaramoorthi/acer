import { Component, OnDestroy, OnInit } from '@angular/core';
import { AUTHENTICATED_USER, BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: any;

  constructor(public hardCodedAuthService: HardCodedAuthenticationService, private basicAuthService: BasicAuthenticationService) { }

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


}
