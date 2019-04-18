import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { User } from "../../interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const candidateUser = {
      username: this.username, 
      password: this.password
    };
    interface Response {
      success: boolean; token?: string; 
      msg?: String; user?: User
    };

    this.authService.login(candidateUser)
    .catch((err) => console.log(err))
    .then((response: Response) => {
      console.log(response);
    })

  
    // this.authService.authenticateUser(user).subscribe(data => {
    //   if(data.success) {
    //     this.authService.storeUserData(data.token, data.user);
    //     this.snackBar.open('Welcome to CURE', '', {duration:2000})
    //     this.router.navigate(['/new']);
    //   }else {
    //     this.snackBar.open('Incorrect login information', 'dismiss', {duration:3000})
    //     this.router.navigate(['/login']);
        
    //   }
    // })
  }
}
