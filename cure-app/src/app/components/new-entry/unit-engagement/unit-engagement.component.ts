import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Activity } from "../../../data/activity";

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.dataService.getActivities()
.subscribe(data => this.activities = data['activities'].filter(e => e.category == 'Unit Engagement'));
  }

  activityClick() {
    console.log(this.activities);
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
  }
