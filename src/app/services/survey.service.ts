import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {  
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/project/';

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

  liveSurvey(live: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/changeSurveyLive',
      live
    );
  }

  listSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/list survey details',
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
