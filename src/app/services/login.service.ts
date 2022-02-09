import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dbUrl = 'https://compute.twixor.digital/d/project/';

  login(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/Validate user',
      log
    );
  }

  resetPwd(log: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/reset password',
      log
    );
  }

  constructor(private http: HttpClient) {}
}
