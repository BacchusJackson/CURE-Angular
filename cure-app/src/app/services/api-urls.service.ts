import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiURLsService {
  apiURL = environment.apiURL;
  
  public get registerUser() : string {
    return this.apiURL + 'users/register'
  }

  public get authenticateUser() : string {
    return this.apiURL + 'users/authenticate'
  }
  
  public get userProfile() : string {
    return this.apiURL + 'users/profile'
  }
  
  public get updateUserProfile() : string {
    return this.apiURL + 'users/updateProfile'
  }

  public get allActivities() : string {
    return this.apiURL + 'data/allActivities'
  }
  public get allEntries() : string {
    return this.apiURL + 'data/allEntries'
  }

  public get addEntry() : string {
    return this.apiURL + 'data/addEntry'
  }
  
  public get sites() : string {
    return this.apiURL + 'data/sites'
  }
  
  constructor() { }
}
