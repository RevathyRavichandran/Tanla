import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/app/';
  

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/employee_registration',
      user
    );
  }

  listUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/list user details',
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/updateUserDetailsAPI',
      user
    );
  }

  audit(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/updateUserDetailsAPI',
      user
    );
  }

  constructor(private http: HttpClient) {}
}
