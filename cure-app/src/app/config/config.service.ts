import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  public allActivities: 'http://localhost:3000/data/allActivities';

  constructor() { }


}
