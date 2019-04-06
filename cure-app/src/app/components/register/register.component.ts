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
    }
    //Check if passwords match
    if(user.password!==this.password2) {
      this.snackBar.open('Your passwords are not matching...', 'dismiss', {duration:3000});
      return false
    }
    //validate the user information with the database
    if(!this.validateService.validateRegister(user)) {
      this.snackBar.open('You missed something!', 'dismiss', {duration:3000})
      return false
    }
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
