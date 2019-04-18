import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<object>;

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.user$ = this.authService.user;
  }
  
  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('See you next time!', '', {duration:3000})
    this.router.navigate(['/login']);
  }

}
