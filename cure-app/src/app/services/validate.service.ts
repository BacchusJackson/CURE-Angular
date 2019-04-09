import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private authService:AuthService, private http:Http) { }

  validateRegister(user, confirmPassword) {
    
    //check for missing fields
    if(!user.firstName || !user.lastName || !user.password || !user.username) {
      return {validUser: false, reason: 'Missing information!'};
    };
    
    //make sure the passwords match
    if(user.password != confirmPassword){
      return {validUser: false, reason:"Password don't match"}
    };
    
    return {validUser: true}
    
  };

  //http request to server to check for user name
  existingUserCheck(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/existingUserCheck', user, {headers:headers})
    .pipe(map(res => res.json()))
  };

  // validateEntry(newEntry) {
  //   if()
  // }
}
