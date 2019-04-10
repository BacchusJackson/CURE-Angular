import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Activity } from "../../../data/activity";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-leader-consultation',
  templateUrl: './leader-consultation.component.html',
  styleUrls: ['./leader-consultation.component.css']
})
export class LeaderConsultationComponent implements OnInit {
  activities: Activity[];
  activityNames: String[];
  hours:number;
  members:number;
  description:string;
  vHours:boolean;
  vMembers: boolean;
  vDescription: boolean;
  selectedActivity: Activity;

  constructor(private dataService: DataService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.dataService.getActivities()
.subscribe(data => this.activities = data['activities'].filter(e => e.category == 'Leader Consultation'));
  }

  activityOptionClick() {
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
    this.snackBar.open('Activity has been added!','',{duration:3000})
    this.onClear();
  }
  onClear():void {
    this.hours = null;
    this.members=null;
    this.description = '';
  }
  }