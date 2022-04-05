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
      this.dbUrl + 'aupoc/api/createSurveyAPI',
      survey
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/questionUploadAPI',
      content
    );
  }

  liveSurvey(live: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/activeSurvey',
      live
    );
  }

  listSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/list survey details',
      survey
    );
  }

  downloadSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/respondantDownload',
      survey
    );
  }

  downloadQues(ques: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/qusAnsDownloadAPI',
      ques
    );
  }

  downloadQuesTemp(ques: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/questionTempFile',
      ques
    );
  }

  fetchSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/searchBysurveyName',
      survey
    );
  }

  fetchQuestion(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/searchbyQuestion',
      survey
    );
  }

  selectSurveytype(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/survey_type_new',
      survey
    );
  }

  approveSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/approval_API',
      survey
    );
  }

  constructor(private http: HttpClient) {}
}
