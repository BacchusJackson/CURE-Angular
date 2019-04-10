import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { DataService } from "../../services/data.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  sitesData: [];
  sites: [];
  clinics: [];

  selectedSite: String;
  selectedClinic: String;

  constructor(
    private authService: AuthService, 
    private router:Router,
    private dataService:DataService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserProfile();
    this.getSites();

  }
  
  getUserProfile():void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.selectedSite = this.user['site'];
      this.selectedClinic = this.user['clinic'];
    });
    
    
  }
  getSites():void {
    this.dataService.getSites().subscribe(data => {
      this.sitesData = data['sites'];
      this.sites = data['sites'].map(e => e.name);
    })
  }
  getClinics():void {
    const filteredSite =this.sitesData
    .filter(site => site['name'] ==this.selectedSite);
    
    this.clinics = filteredSite[0]['clinics']

  }

  onSubmit():void {
    const updateInfo = {
      userID: this.user['_id'],
      site: this.selectedSite,
      clinic: this.selectedClinic,
      status: this.user['status']
    }

    this.authService.updateProfile(updateInfo).subscribe(response => {
      if(response['success']) {
        this.snackBar.open('Profile Updated', '', {duration: 3000})
      }else {
        this.snackBar.open(response['msg'], '', {duration: 3000})
        console.log(response);
      }
    })
  }
}
