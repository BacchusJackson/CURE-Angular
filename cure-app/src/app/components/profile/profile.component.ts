import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { DataService } from "../../services/data.service";

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
    private dataService:DataService) { }

  ngOnInit() {
    this.getUserProfile();
    this.getSites();
  }
  
  getUserProfile():void {
    this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
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
      .filter(site => site['name'] ==this.selectedSite['name']);

    console.log(filteredSite);

  }
}
