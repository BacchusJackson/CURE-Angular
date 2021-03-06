import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http, private http2:HttpClient) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .pipe(map(res => {
        return res.json();
      }))
  }
  
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()))
    }

    getProfile() {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/users/profile', {headers: headers})
        .pipe(map(res => res.json()))
      
  }
  //used for changing site, clinic, and user status
  updateProfile(updateInfo) {

    return this.http2.post('http://localhost:3000/users/updateProfile', updateInfo)
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  // Checks for a token and if it's expired returns true or false
  loggedIn(){
    const helper = new JwtHelperService();
    if(this.authToken){
      if(helper.isTokenExpired(this.authToken) == false){
        return true;
      }
    }else{
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
