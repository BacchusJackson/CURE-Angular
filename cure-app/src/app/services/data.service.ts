import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../data/activity";
import { Entry } from "../data/entry";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient){ }
  //call to get all activities 
  getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>('data/allActivities')
  }

  getEntries(site?:String): Observable<Entry[]> {

    return this.http.get<Entry[]>('data/allEntries')
  }

  addEntry(newEntry:Entry) {
    const httpOptions = {
      headers: new HttpHeaders ({
      'Content-Type':'application/json'
    })
  };

    return this.http.post('data/addEntry', newEntry, httpOptions)
  }

  getSites(): Observable<Object[]>{

    return this.http.get<Object[]>('data/sites')
  }
}