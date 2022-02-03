import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SampleJson from '../../assets/db.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  arr = SampleJson['questionaries'];
  private dbUrl = "https://compute.twixor.digital/d/project/NPS Feedback/api/";

  constructor(private http: HttpClient) {}

  // public getAllQuestionaries() {
  //   return [...this.arr];
  // }

  public getAllQuestionaries() {
    return this.http.post(this.dbUrl + "Display Questio, Option List", { ProcessVariables: {} })
  }

  public updateQuestion(question: any) {
    return this.http.post(this.dbUrl + "Edit  OR Delete API", question);
  }

  public createQuestion(question: any) {
    return this.http.post(this.dbUrl + "Edit  OR Delete API", question);
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
