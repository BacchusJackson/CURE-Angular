import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { User } from "../../interfaces/user";
import { Observable } from 'rxjs';

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
    
    /* 
    Attempt authentication through the auth service, once the http request
    returns a response, if the authentication was successful, confirm the
    authentication with the auth service and natigate to new entry
    */
   
   this.authService.login(candidateUser)
   
  }
}
