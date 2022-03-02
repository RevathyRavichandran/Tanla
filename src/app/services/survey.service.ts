import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {  
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/app/';

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/createSurveyAPI',
      survey
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/qusAnsUploadApi',
      content
    );
  }

  liveSurvey(live: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/activeSurvey',
      live
    );
  }

  listSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/list survey details',
      survey
    );
  }

  downloadSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/respondantDownload',
      survey
    );
  }

  downloadQues(ques: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/qusAnsDownloadAPI',
      ques
    );
  }

  fetchSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/searchBysurveyName',
      survey
    );
  }

  fetchQuestion(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'npsfeedback/api/searchbyQuestion',
      survey
    );
  }

  constructor(private http: HttpClient) {}
}
