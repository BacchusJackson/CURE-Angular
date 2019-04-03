import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.firstName && user.lastName && user.password) {
      return true;
    } else {
      return false;
    }
  }


}
