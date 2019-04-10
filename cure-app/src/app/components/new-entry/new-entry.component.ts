import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Activity } from "../../data/activity";

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})

export class NewEntryComponent implements OnInit {
  activities: Activity[];
  constructor(private dataService:DataService) { 

  }
  
  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.dataService.getActivities()
    .subscribe(activities => this.activities = activities);
  }
  
}
 