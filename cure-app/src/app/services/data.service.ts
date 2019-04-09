import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "../config/config.service";
//import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient, private api:ConfigService) { }
  
  //call to get all activities
  getActivities() {
    this.api.getApis();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    //headers = new HttpHeaders
    //headers.append('Content-Type', 'application/json');

    //return this.http.get('http://localhost:3000/data/allActivities', {headers:headers})
    //.pipe(map(res => res.json()))
    //  }
    

    return this.http.get(this.api.allActivitiesUrl, httpOptions);
  
  }
}

