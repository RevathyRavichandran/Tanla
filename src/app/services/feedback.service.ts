import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private dbUrl = "https://appiyo.karix.solutions/appiyo/d/app/";

  public getAllFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'npsfeedback/api/Feedback screen API', feedback);
  }

  constructor(private http: HttpClient) { }
}
