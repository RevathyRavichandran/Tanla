import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dbUrl = 'https://compute.twixor.digital/d/app/nps_twixor_survey/api/';

  login(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'login_userCheck',
      log
    );
  }

  resetPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'resetPassword',
      log
    );
  }

  forgotPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'forgotPassword',
      log
    );
  }

  logout(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'UserLogoutAPI',
      log
    );
  }

  constructor(private http: HttpClient) {}
}
