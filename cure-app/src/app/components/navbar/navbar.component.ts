import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('See you next time!', '', {duration:3000})
    this.router.navigate(['/login']);
    return false;
  }

}
