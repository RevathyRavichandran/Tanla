import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  isAuthenticated(): boolean {
    const token = localStorage.getItem('loginCheck');
    // Check whether the token is expired and return
    // true or false
    return token === '1' ? true : false;
  }
}