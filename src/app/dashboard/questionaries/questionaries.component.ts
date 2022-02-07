import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import * as uuid from 'uuid';
import { PopupComponent } from '../popup/popup.component';
import _ from 'lodash';

@Component({
  selector: 'app-questionaries',
  templateUrl: './questionaries.component.html',
  styleUrls: ['./questionaries.component.css'],
})
export class QuestionariesComponent implements OnInit {
  datas = [];
  categories = [];

  createQuestion() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '1000px',
      data: {
        categories: this.categories,
        category: this.categories[0],
        question: '',
        editMode: false,
        answers: [
          {
            answer: '',
          },
          {
            answer: '',
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.comMethod(result);
    });
  }

  comMethod(data) {
    console.log('data <<<< ', data);
    let val = this.datas.filter((val) => val.category === data.category)[0];
    let answers = [];
    data.answers.forEach((element) => {
      answers.push({ id: uuid.v4(), answer: element.answer });
    });
    let questions = val.questions;
    questions.push({
      id: uuid.v4(),
      question: data.question,
      answers: answers,
    });
    let payload = {
      id: val.id,
      category: val.category,
      questions: questions,
    };
    // this.datas = this.appService.updateQuestion(payload, payload.id);
  }

  editQuestion(category, id) {
    this.datas.forEach((data) => {
      if (data.category === category) {
        data.questions.forEach((ques) => {
          if (ques.id === id) {
            const dialogRef = this.dialog.open(PopupComponent, {
              width: '1000px',
              data: {
                categories: this.categories,
                category: data.category,
                question: ques.question,
                answers: ques.answers,
                score: 10,
                editMode: true,
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              let payload = {
                ProcessVariables: {
                  questionsInput: [
                    {
                      id: id,
                      category_name: category,
                      mcq_question: result.question,
                      category_order: data.id,
                    },
                  ],
                  optionsInput: [],
                },
              };
              result['answers']
                .filter((ans) => ans.id === null)
                .forEach((element) => {
                  payload['ProcessVariables']['optionsInput'].push({
                    id: null,
                    category_id: id,
                    category_name: category,
                    option: element.answer,
                  });
                });
              ques.answers.forEach((element) => {
                let ans = result['answers'].filter(
                  (an) => element.id === an.id
                )[0];
                if (ans) {
                  payload['ProcessVariables']['optionsInput'].push({
                    id: ans.id,
                    category_id: id,
                    category_name: category,
                    option: ans.answer,
                    delete: false,
                  });
                } else {
                  payload['ProcessVariables']['optionsInput'].push({
                    id: element.id,
                    category_id: id,
                    category_name: category,
                    option: element.answer,
                    delete: true,
                  });
                }
              });
              this.appService.updateQuestion(payload).subscribe(
                (res) => {
                  this.commonMethod();
                },
                (err) => {
                  console.log('err <<< ', err);
                }
              );
            });
          }
        });
      }
    });
  }

  removeQuestion(category, id) {
    this.datas.forEach((data) => {
      if (data.category === category) {
        let question = data.questions.filter((ques) => ques.id === id)[0];
        let payload = {
          ProcessVariables: {
            questionsInput: [
              {
                id: id,
                category_name: category,
                mcq_question: question.question,
                category_order: data.id,
                delete: true,
              },
            ],
          },
        };
        this.appService.updateQuestion(payload).subscribe(
          (res) => {
            this.commonMethod();
          },
          (err) => {
            console.log('err <<< ', err);
          }
        );
      }
    });
  }

  commonMethod() {
    this.appService.getAllQuestionaries().subscribe((res) => {
      let result = res['ProcessVariables'];
      let value = _.groupBy(result['questionList'], 'category_order');
      let ans = _.groupBy(result['optionsList'], 'category_id');
      let arr = [];
      Object.keys(value).forEach((ele) => {
        let hash = {};
        hash['id'] = ele;
        hash['category'] = value[ele][0]['category_name'];
        this.categories.push(hash['category']);
        hash['questions'] = [];
        value[ele].forEach((inner_ele) => {
          let inner_ans = ans[inner_ele['id']];
          let answer = [];
          if (inner_ans) {
            inner_ans.forEach((inn_ans) => {
              answer.push({ id: inn_ans['id'], answer: inn_ans['option'] });
            });
          }
          hash['questions'].push({
            id: inner_ele['id'],
            question: inner_ele['mcq_question'],
            answers: answer,
          });
        });
        arr.push(hash);
      });
      this.datas = arr;
    });
  }

  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.commonMethod();
  }
}
