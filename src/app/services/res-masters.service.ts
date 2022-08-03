import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResMastersService {
  private dbUrl = 'https://compute.twixor.digital/d/app/nps_twixor_survey/api/';

  getAllRecord(feedback: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'RespondantList',
      feedback
    );
  }

  downloadFile(file: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'downloadEmptyCSV',
      file
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'respondantUploadAPI',
      content
    );
  }

  deleteRespondent(res: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'deleteRespondantAPI',
      res
    );
  }

  constructor(private http: HttpClient) {}
}
