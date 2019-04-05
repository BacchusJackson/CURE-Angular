import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})

export class NewEntryComponent implements OnInit {
  activities: any;
  hours: number;
  members: number;
  
  constructor() { 

  }
  
  ngOnInit() {
    this.activities=['Item 1', 'Item 2', 'Item 3'];
    
  }

  onSubmit() {
    console.log('submit button clicked');
  }
}
