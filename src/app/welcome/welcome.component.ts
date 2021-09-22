import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message = "Welcome to our app"
  name = "";
  welcomeMessageFromServer : string ='';
  welcomeErrorMessageFromServer : string = '';

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) {

  }

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.welcomeDataService.executeHelloWorld().subscribe(response => this.handleSuccessResponse(response), 
    error => this.handleErrorResponse(error));
  }

  getWelcomeMessageWithParameter() {
    this.welcomeDataService.executeHelloWorldWithPathVariable(this.name).subscribe(response => this.handleSuccessResponse(response), 
    error => this.handleErrorResponse(error));
  }

  handleSuccessResponse(response: any) {
    this.welcomeMessageFromServer = response.message;
  }

  handleErrorResponse(error: any){
    this.welcomeErrorMessageFromServer = error.error.message;
  }




}
