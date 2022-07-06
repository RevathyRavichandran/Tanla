import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResMastersService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/app/';

  getAllRecord(feedback: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/RespondantList',
      feedback
    );
  }

  downloadFile(file: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/downloadEmptyCSV',
      file
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/respondantUploadAPI',
      content
    );
  }

  deleteRespondent(res: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/deleteRespondantAPI',
      res
    );
  }

  constructor(private http: HttpClient) {}
}
