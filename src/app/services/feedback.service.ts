import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private dbUrl = "https://appiyo.karix.solutions/appiyo/d/project/";

  public getAllFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'NPS Feedback/api/Feedback screen API', feedback);
  }

  constructor(private http: HttpClient) { }
}
