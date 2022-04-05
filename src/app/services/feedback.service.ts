import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private dbUrl = "https://appiyo.karix.solutions/appiyo/d/app/";

  public getAllFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'aupoc/api/Feedback screen API', feedback);
  }
  public filterFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'aupoc/api/new_feedback_report', feedback);
  }
  public autofill(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'aupoc/api/new_autofill', feedback);
  }

  public feedbackPagination(feedback: any): Observable<any> {
    return this.http.post<any>(this.dbUrl + 'aupoc/api/Feedback_Report_Pagination', feedback);
  }

  constructor(private http: HttpClient) { }
}
