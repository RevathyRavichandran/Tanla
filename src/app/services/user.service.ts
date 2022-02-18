import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/project/';

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/createUserInAdmin',
      user
    );
  }

  listUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/list user details',
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/updateUserDetailsAPI',
      user
    );
  }

  constructor(private http: HttpClient) {}
}
