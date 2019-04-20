import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  
  onLoginSubmit() {
    const candidateUser = {
      username: this.username, 
      password: this.password
    };
    //ADD LOGIN MESSAGE AND ROUTE CHANGE
  this.authService.login(candidateUser)

  }
}
