import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/project/';

  login(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/login_userCheck',
      log
    );
  }

  resetPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/resetPassword',
      log
    );
  }

  forgotPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/forgotPassword',
      log
    );
  }

  logout(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/logoutAPI',
      log
    );
  }

  constructor(private http: HttpClient) {}
}
