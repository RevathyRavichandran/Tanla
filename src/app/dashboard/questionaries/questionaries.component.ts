import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import * as uuid from 'uuid';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-questionaries',
  templateUrl: './questionaries.component.html',
  styleUrls: ['./questionaries.component.css'],
})
export class QuestionariesComponent implements OnInit {

  datas = [];

  createQuestion() {
    const dialogRef = this.dialog.open(
      PopupComponent,
      {
        width: '1000px',
        data: {
          category: 'SMS',
          question: '',
          editMode: false,
          answers: [
            {
              answer: ''
            },
            {
              answer: ''
            }
          ]
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.comMethod(result);
    });
  }

  comMethod(data) {
    let val = this.datas.filter(val => val.category === data.category)[0];
    let answers = [];
    data.answers.forEach(element => {
      answers.push({ "id": uuid.v4(), "answer": element.answer });
    });
    let questions = val.questions;
    questions.push({ "id": uuid.v4(), "question": data.question, answers: answers })
    let payload = {
      id: val.id,
      category: val.category,
      questions: questions
    }
    this.datas = this.appService.updateQuestion(payload, payload.id);
  }

  editQuestion(category, id) {
    this.datas.forEach(data => {
      if (data.category === category) {
        data.questions.forEach(ques => {
          if (ques.id === id) {
            const dialogRef = this.dialog.open(
              PopupComponent,
              {
                width: '1000px',
                data: {
                  category: data.category,
                  question: ques.question,
                  answers: ques.answers,
                  editMode: true
                }
              }
            );

            dialogRef.afterClosed().subscribe(result => {
              ques['question'] = result.question;
              result['answers'].forEach((element, index) => {
                if (ques['answers'][index]) {
                  ques['answers'][index]['answer'] = element.answer;
                } else {
                  ques['answers'].push({ "id": uuid.v4(), "answer": element.answer });
                }
              });
              this.datas = this.appService.updateQuestion(data, data.id);
            });
          }
        });
      }
    })
  }

  removeQuestion(category, id) {
    this.datas.forEach(data => {
      if (data.category === category) {
        data.questions = data.questions.filter(ques => ques.id !== id);
        this.datas = this.appService.updateQuestion(data, data.id);
      }
    })
  }

  commonMethod() {
    this.datas = this.appService.getAllQuestionaries();
  }

  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.commonMethod();
  }
}
