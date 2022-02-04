import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private dbUrl = 'https://compute.twixor.digital/d/project/';

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/createSurveyAPI',
      survey
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/qusAnsUploadApi',
      content
    );
  }

  listSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/surveyList',
      survey
    );
  }

  downloadSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/csv download_survey',
      survey
    );
  }

  constructor(private http: HttpClient) {}
}
