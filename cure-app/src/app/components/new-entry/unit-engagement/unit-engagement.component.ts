import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Activity } from "../../../data/activity";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "../../../services/auth.service";
import { ValidateService } from "../../../services/validate.service";
import { Entry } from "../../../data/entry";

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
  dateEntered: Date;
  vHours:boolean;
  vMembers: boolean;
  vDescription: boolean;
  selectedActivity: Activity;
  user: Object;
  newEntry: Entry;

  constructor(
    private dataService: DataService, 
    private snackBar:MatSnackBar,
    private authService: AuthService,
    private validateService: ValidateService ) { }

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
  onSubmit() {
    /*
    Dev comments
    1. add the hours, members, and description to the entry model
    2. add a date input
    3. data validation for entry
    4. data service submission
    */

    //this.newEntry.activityID = this.selectedActivity['_id'];


    this.newEntry = {
      activityID: this.selectedActivity['_id'],
      activity: this.selectedActivity.name,
      category: this.selectedActivity.category,
      creator: this.user['username'],
      dateEntered: this.dateEntered,
      dateCreated: new Date(),
      site: this.user['clinic'],
      clinic: this.user['site'],
      userStatus: this.user['status'],
      hours: null,
      members: null,
      description: null
    };

    //check to see if the fields are visible before assignment
    if(this.vHours) {this.newEntry.hours = this.hours};
    if(this.vMembers) {this.newEntry.members = this.members};
    if(this.vDescription) {this.newEntry.description = this.description};
    
    //do a validation test on the new Entry object
    let test = this.validateService.validateEntry(this.newEntry);
    
    //data validation test for background errors (ex. user profile information)
    if(!test.validEntry) {
      this.snackBar.open(test.reason,'dismiss',{duration:3000})
      return false;
    }

    this.dataService.addEntry(this.newEntry).subscribe(response => {
      if(response['success']) {
        this.snackBar.open(response['msg'], 'dismiss', {duration: 3000})
      } else {
        this.snackBar.open(response['msg'], 'dismiss', {duration: 3000})
      }
    })
  }
  onClear():void {
    this.hours = null;
    this.members=null;
    this.description = '';
  }
  }
