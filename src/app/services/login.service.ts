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
      this.dbUrl + 'aupoc/api/login_userCheck',
      log
    );
  }

  resetPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/resetPassword',
      log
    );
  }

  forgotPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/forgotPassword',
      log
    );
  }

  logout(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/UserLogoutAPI',
      log
    );
  }

  constructor(private http: HttpClient) {}
}
