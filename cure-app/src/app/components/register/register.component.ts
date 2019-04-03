import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  password: String;

  constructor(private validateService: ValidateService, 
    private flashMessage: FlashMessagesService, 
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Cannot submit blank fields', {cssClass: 'alert-danger', timeout: 3000});
    }
    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You have been sucessfully registered! You can now login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Whoops... Something is broken, send help', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
        
      }
    });
  }


}
