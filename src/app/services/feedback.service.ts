import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private dbUrl = "https://compute.twixor.digital/d/app/multisurvey_v0/api/";

  public getAllFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'Feedback_screen_API', feedback);
  }
  public filterFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'new_feedback_report', feedback);
  }
  public autofill(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'new_autofill', feedback);
  }

  public feedbackPagination(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'Feedback_Report_Pagination', feedback);
  }

  constructor(private http: HttpClient) { }
}
