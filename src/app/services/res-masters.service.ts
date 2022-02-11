import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResMastersService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/project/';

  getAllRecord(feedback: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/respondantMasterList',
      feedback
    );
  }

  downloadFile(file: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/downloadEmptyCSV',
      file
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/CSV upload API',
      content
    );
  }

  constructor(private http: HttpClient) {}
}
