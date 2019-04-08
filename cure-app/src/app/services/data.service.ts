import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:Http) { }

  //call to get all activities
  getActivities() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/data/allActivities', {headers:headers})
    .pipe(map(res => res.json()))
  }


}