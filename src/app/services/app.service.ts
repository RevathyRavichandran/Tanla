import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SampleJson from '../../assets/db.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  arr = SampleJson['questionaries'];
  private dbUrl = "https://compute.twixor.digital/d/app/nps_twixor_survey/api/";

  constructor(private http: HttpClient) {}

  // public getAllQuestionaries() {
  //   return [...this.arr];
  // }

  public getAllQuestionaries(payload: any) {
    return this.http.post(this.dbUrl + "answerOptionList", payload)
  }

  public updateQuestion(question: any) {
    return this.http.post(this.dbUrl + "qusAnsUpdateAPI", question);
  }

  public createQuestion(question: any) {
    return this.http.post(this.dbUrl + "createQuestionary", question);
  }

  // public updateQuestion(question: any, id: any) {
  //   this.arr.forEach((val, index) => {
  //     if (val.id === id) {
  //       this.arr[index] = question;
  //     }
  //   });
  //   return [...this.arr];
  // }
}
