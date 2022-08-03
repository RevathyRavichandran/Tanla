import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {  
  private dbUrl = 'https://compute.twixor.digital/d/app/nps_twixor_survey/api/';

  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'createSurveyAPI',
      survey
    );
  }

  uploadFile(content: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'questionUploadAPI',
      content
    );
  }

  liveSurvey(live: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'activeSurvey',
      live
    );
  }

  listSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'list survey details',
      survey
    );
  }

  downloadSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'respondantDownload',
      survey
    );
  }

  downloadQues(ques: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'qusAnsDownloadAPI',
      ques
    );
  }

  downloadQuesTemp(ques: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'questionTempFile',
      ques
    );
  }

  fetchSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'searchBysurveyName',
      survey
    );
  }

  fetchQuestion(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'searchbyQuestion',
      survey
    );
  }

  selectSurveytype(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'survey_type_new',
      survey
    );
  }

  approveSurvey(survey: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'approval_API',
      survey
    );
  }

  constructor(private http: HttpClient) {}
}
