import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})

export class NewEntryComponent implements OnInit {
  //bound variables
  hours: number;
  members: number;
  descrption: string;
  activitySelect: object;

  vHours: boolean;
  vMembers: boolean;
  vDescription: boolean;

  activities: any;
  activeForm: string;
  recData:object;
  properties: any;
  
  constructor(
    private dataService:DataService,
    private snackBar: MatSnackBar
    ) { 

  }
  
  ngOnInit() {

    //turns on all the fields
    this.vHours = true;
    this.vMembers = true;
    this.vDescription = true;

    //pull the activities from the database
    this.getActivities();

    
  }


  onSubmit(activeForm) {
    console.log('submit button clicked on '+activeForm);
  }

  getActivities() {
    this.dataService.getActivities().subscribe(res => {

      this.recData = res['activities']
      
    }, 
    //if there is an error for some weird reason
    err => { throw err}, 
    //once the data is retrieved
    () => { }
    )

  }

  activityClick(activeForm) {
    //when the activity box is selected
    const activities = this.recData;
    const totalActivities = Object.keys(activities);
    const tempList = [];

    //loop through all of the recieved data for activities
    for (let i = 0; i < totalActivities.length; i++) {
      const activity = activities[i];
      
      //if the category matches the active form, push it to the activities list
      if(activity.category == activeForm && activity.name != this.activitySelect) {
        tempList.push(activity.name)
      }
      
    }
    //the options in the dropdown menus
    this.activities = tempList;
  };

  activityOptionClick(activeForm) {
    const activities = this.recData;
    const totalActivities = Object.keys(activities);

    //loop through each activity 
    for (let i = 0; i < totalActivities.length; i++) {
      const activity = activities[i];
      
      //if the category matches the form and the name is the same, set new properties
      if(activity.category == activeForm && activity.name == this.activitySelect) {
          this.properties = activity.properties;
          console.log(this.properties);
          break;
      }
    }

    //load the correct properties on the form
    this.loadProperties();
  };

  loadProperties() {
    //make all of the fields invisible to start
    this.vHours = false;
    this.vMembers = false;
    this.vDescription = false;

    //go through the properties and make the correct ones visible
    this.properties.map(prop => {
      if(prop == 'hours'){
        this.vHours = true
      };
      if(prop == 'members') {
        this.vMembers = true
      };
      if(prop == 'description'){
        this.vDescription = true
      };

    })
    
  };

  onClear() {
    this.hours=null;
    this.members=null;
  }

}
