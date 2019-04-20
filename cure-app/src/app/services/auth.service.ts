import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiURLsService } from "../services/api-urls.service";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authToken: any;
  private user: User;

  private userLoggedIn = new BehaviorSubject<boolean>(false);
  private httpOptions = {headers: new HttpHeaders ({'Content-Type':'application/json'})};
  
  constructor(
    private http:HttpClient,
    private api:ApiURLsService ) { }
    
  get isLoggedIn(): Observable<boolean>{
    return this.userLoggedIn.asObservable();
  }

  login(candidateUser):void {
    
    interface Response {success: Boolean; msg?: String; 
      token?: String; user?: User;}
      
      //post request to check username and password
      this.http.post(this.api.authenticateUser, candidateUser, this.httpOptions).toPromise()
      .then((response: Response) => {
        if(response.success) {
          this.storeUserData(response.token, response.user)
          this.userLoggedIn.next(true);
        } else {
          this.userLoggedIn.next(false);
        }
      })
    }
    
    //post request to create a new user
    registerUser(user: User): void {
      interface Response {success: Boolean; msg?: String}
      
      this.http.post(this.api.registerUser, user, this.httpOptions).toPromise()
      .then((response: Response) => {
        if(response.success) {
          console.log('User successfully registered');
        } else {
          console.log(response.msg);
        }
      })
    };

    getProfile() {
      this.loadToken();

      return this.http.get(this.api.userProfile, this.httpOptions)

    }
    
    //used for changing site, clinic, and user status
    updateProfile(updateInfo): void {
      
    interface Response {success: Boolean; msg?: String}

    this.http.post(this.api.updateUserProfile, updateInfo).toPromise()
    .then((response: Response) => {
      if(response.success) {
        console.log("User Profile updated successfully");
      } else {
        console.log(response.msg);
      }
    })
  }
  
  private loadToken(): void {
    let token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  private storeUserData(token, user): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //   getProfile() {
  //     let headers = new Headers();
  //     this.loadToken();
  //     headers.append('Authorization', this.authToken);
  //     headers.append('Content-Type', 'application/json');
  //     return this.http.get(this.api.userProfile, {headers: headers})
  //       .pipe(map(res => res.json()))
      
  // }
  
  // // Checks for a token and if it's expired returns true or false
  // loggedIn(){
    //   const helper = new JwtHelperService();
  //   if(this.authToken){
  //     if(helper.isTokenExpired(this.authToken) == false){
  //       return true;
  //     }
  //   }else{
  //     return false;
  //   }
  // }

}
