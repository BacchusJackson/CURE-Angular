import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  allActivitiesUrl: string;

  constructor() { }
    
    getApis() {
      
      this.allActivitiesUrl = "http://localhost:3000/data/allActivities";

    }


}
