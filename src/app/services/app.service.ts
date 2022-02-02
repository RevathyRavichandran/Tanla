import { Injectable } from '@angular/core';
import SampleJson from '../../assets/db.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  arr = SampleJson['questionaries'];

  constructor() {}

  public getAllQuestionaries() {
    return [...this.arr];
  }

  public updateQuestion(question: any, id: any) {
    this.arr.forEach((val, index) => {
      if (val.id === id) {
        this.arr[index] = question;
      }
    });
    return [...this.arr];
  }
}
