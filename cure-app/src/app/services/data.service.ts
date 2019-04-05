import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  getCategories() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  }
}
