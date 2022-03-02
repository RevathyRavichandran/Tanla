import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/app/';

  login(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/login_userCheck',
      log
    );
  }

  resetPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/resetPassword',
      log
    );
  }

  forgotPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/forgotPassword',
      log
    );
  }

  logout(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/logoutAPI',
      log
    );
  }

  constructor(private http: HttpClient) {}
}
