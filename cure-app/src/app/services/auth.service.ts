import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiURLsService } from "../services/api-urls.service";
import { User } from "../interfaces/user";
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  response: object;

  constructor(
    private http:Http, 
    private http2:HttpClient,
    private api:ApiURLsService ) { }
  
  private userLoggedIn = new BehaviorSubject<boolean>(false);

  public get isLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  confirmAuthentication(token: string, user: User) {
    this.storeUserData(token, user);
    this.userLoggedIn.next(true);
  }

  login(candidateUser) {

    const httpOptions = {headers: 
      new HttpHeaders ({'Content-Type':'application/json'})
    };
    //post request to check username and password
    this.http2.post(this.api.authenticateUser, candidateUser, httpOptions).toPromise()
    .then((response) => {
      if(response['success']) {
        console.log('good login attempt');
        this.userLoggedIn.next(true);
        this.storeUserData(response['token'], response['user'])
      } else {
        console.log('bad login attempt');
        this.userLoggedIn.next(false);
      }
    })
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.api.registerUser, user, {headers: headers})
      .pipe(map(res => {
        return res.json();
      }))
  }
  
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.api.authenticateUser, user, {headers: headers})
      .pipe(map(res => res.json()))
    }

    getProfile() {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.api.userProfile, {headers: headers})
        .pipe(map(res => res.json()))
      
  }
  //used for changing site, clinic, and user status
  updateProfile(updateInfo) {

    return this.http2.post(this.api.updateUserProfile, updateInfo)
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
