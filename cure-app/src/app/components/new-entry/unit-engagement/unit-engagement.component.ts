import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Activity } from "../../../data/activity";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-unit-engagement',
  templateUrl: './unit-engagement.component.html',
  styleUrls: ['./unit-engagement.component.css']
})
export class UnitEngagementComponent implements OnInit {

  activities: Activity[];
  activityNames: String[];
  hours:number;
  members:number;
  description:string;
  vHours:boolean;
  vMembers: boolean;
  vDescription: boolean;
  selectedActivity: Activity;
  user: Object;

  constructor(
    private dataService: DataService, 
    private snackBar:MatSnackBar,
    private authService: AuthService ) { }

  ngOnInit() {
    this.getActivities();
    this.setUserProfile();

  }

  getActivities(): void {
    this.dataService.getActivities()
.subscribe(data => this.activities = data['activities'].filter(e => e.category == 'Unit Engagement'));
  }

  setUserProfile():void {
    this.authService.getProfile()
    .subscribe(data => this.user = data['user']);
  }
  
  activityOptionClick():void {
    this.vHours = false;
    this.vMembers = false;
    this.vDescription = false;

    this.selectedActivity.properties.forEach( prop => {
      if(prop =='hours'){ this.vHours = true };
      if(prop =='members'){ this.vMembers = true };
      if(prop =='description'){ this.vDescription = true};
    });

  }
  onSubmit():void {
    /*
    Dev comments
    1. add the hours, members, and description to the entry model
    2. add a date input
    3. data validation for entry
    4. data service submission
    */
    const newEntry = {
      activityID: this.selectedActivity['_id'],
      activity: this.selectedActivity.name,
      category: this.selectedActivity.category,
      creator: this.user['username'],
      dateEntered: '',
      dateCreated: Date.now(),
      site: this.user['clinic'],
      clinic: this.user['site'],
      userStatus: this.user['status']
    }
    console.log(newEntry);
    //this.snackBar.open('A new entry has been added!','',{duration:3000})
    //this.onClear();

  }
  onClear():void {
    this.hours = null;
    this.members=null;
    this.description = '';
  }
  }
