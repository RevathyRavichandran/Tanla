import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbUrl = 'https://compute.twixor.digital/d/project/';

  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/createUserInAdmin',
      user
    );
  }

  constructor(private http: HttpClient) {}
}
