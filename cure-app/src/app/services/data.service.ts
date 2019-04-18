import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../data/activity";
import { Entry } from "../data/entry";
import { ApiURLsService } from "../services/api-urls.service";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient, private api:ApiURLsService){ }
  //call to get all activities 
  getActivities(): Observable<Activity[]> {

    return this.http.get<Activity[]>(this.api.allActivities)
  }

  getEntries(site?:String): Observable<Entry[]> {

    return this.http.get<Entry[]>(this.api.allEntries)
  }

  addEntry(newEntry:Entry) {
    const httpOptions = {
      headers: new HttpHeaders ({
      'Content-Type':'application/json'
    })
  };

    return this.http.post(this.api.addEntry, newEntry, httpOptions)
  }

  getSites(): Observable<Object[]>{

    return this.http.get<Object[]>(this.api.sites)
  }
}