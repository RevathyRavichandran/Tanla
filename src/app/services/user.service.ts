import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbUrl = 'https://compute.twixor.digital/d/app/nps_twixor_survey/api/';
  

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'employee_registration',
      user
    );
  }

  listUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'list user details',
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'updateUserDetailsAPI',
      user
    );
  }

  audit(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'Audit_Report',
      user
    );
  }

  audit_autofill(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'audit_autofill',
      user
    );
  }

  audit_pagination(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'Audit_Report_Pagination',
      user
    );
  }

  constructor(private http: HttpClient) {}
}
