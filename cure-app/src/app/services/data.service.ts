import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "../config/config.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Activity } from "../data/activity";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private http:HttpClient, 
    private api:ConfigService
     ) { }

  //call to get all activities
  getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>('http://localhost:3000/data/allActivities')
  }
}