import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message = "Welcome to our app"
  name = "";
  welcomeMessageFromServer: string = '';
  welcomeErrorMessageFromServer: string = '';
  content !: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService, private authService : BasicAuthenticationService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.message);
    if(this.route.snapshot.params['name']) {
      this.name = this.route.snapshot.params['name'];
    } else {
      this.name = JSON.stringify(this.authService.getAuthenticatedUser());
    }
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorld().subscribe(response => this.handleSuccessResponse(response, this.content),
      error => this.handleErrorResponse(error));
  }

  getWelcomeMessageWithParameter(content: TemplateRef<any>) {
    this.content = content;
    this.welcomeDataService.executeHelloWorldWithPathVariable(this.name).subscribe(
      response => this.handleSuccessResponse(response, this.content),
      error => this.handleErrorResponse(error));
  }

  handleSuccessResponse(response: any, content: TemplateRef<any>) {
    this.welcomeMessageFromServer = response.message;
    this.modalService.open(content, { centered: true }).result
      .then(result => console.log(`${result}`),
        reason => console.log(`${reason}`));
  }

  handleErrorResponse(error: any) {
    this.welcomeErrorMessageFromServer = error.error.message;
  }

  
  submit(contact : any) {
    console.log(contact);
  }



}
