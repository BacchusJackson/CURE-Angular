import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable } from 'rxjs';
import { User } from "../../interfaces/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getUserProfile();
  }
  
  getUserProfile() {
    this.authService.getProfile().subscribe(data => {
      this.user = data['user']
    })
  };

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('See you next time!', '', {duration:3000})
    this.router.navigate(['/login']);
  }

}
