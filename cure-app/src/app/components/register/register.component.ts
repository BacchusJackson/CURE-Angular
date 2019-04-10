import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  username: String;
  password: String;
  password2: String;

  constructor(private validateService: ValidateService, 
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  
  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      username: this.username
    }

    let validateTest = this.validateService.validateRegister(user, this.password2);


    //check for formatting issues such as missing information
    if(!validateTest.validUser) {
      this.snackBar.open(validateTest.reason, 'dismiss', {duration:3000});
      return false;
    };

    //check if the user name exists
    this.validateService.existingUserCheck(user).subscribe(data => {
      if(data.existingUser) {
        this.snackBar.open('Username is Taken', 'ok', {duration:3000})
        return false;
      }
    });
    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.snackBar.open('You account is pending approval however, You can log in now!', 'ok',{duration:3000})
        this.router.navigate(['/login']);
      } else {
        this.snackBar.open('Whoops... Something is broken! Call for help', 'dimiss', {duration: 3000});
        this.router.navigate(['/register']);
        
      }
    });
  }


}
