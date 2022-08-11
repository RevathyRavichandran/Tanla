import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { PopupComponent } from '../popup/popup.component';
import _ from 'lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SurveyService } from '../../../app/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questionaries',
  templateUrl: './questionaries.component.html',
  styleUrls: ['./questionaries.component.css'],
})
export class QuestionariesComponent implements OnInit {
  role: boolean = true;
  datas = [];
  categories = [];
  name = '';
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  surveyNameList: any = [];
  selectedSurvey: string[];
  noRecords = false;
  isLoad = false;
  alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  createQuestion() {
    let unique = [...new Set(this.categories)];
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '1000px',
      data: {
        categories: unique,
        category: this.categories[0],
        question: '',
        editMode: false,
        surveyName: this.name ? this.name : this.selectedSurvey,
        answers: [
          {
            answer: '',
            score: 0
          },
          {
            answer: '',
            score: 0
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.comMethod(result);
    });
  }
  surveyApply(name) {
    this.name = name;
    let payload = {
      ProcessVariables: { selectedField: '1', selectedValue: name },
    };
    this.commonMethod(payload);
    this.isLoad = true;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.surveyNameList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  comMethod(data) {
    let val = this.datas.filter((val) => val.category === data.category)[0];
    let answers = [];
    data.answers.forEach((element) => {
      answers.push({ value: element.answer, score: element.score });
    });
    let payload = { ProcessVariables: {
      category: val.category,
      categoryQuestion: data.question,
      MCQQuestionList: answers,
      surveyName: this.name ? this.name : this.selectedSurvey
    } };
    this.appService.createQuestion(payload).subscribe(
      (res) => {
        this.toastr.success('Question created successfully', 'Success')
        let load = { ProcessVariables: { surveyName: this.name ? this.name : this.selectedSurvey } };
        this.commonMethod(load);
        this.isLoad = true;
      },
      (err) => {
        console.log('err <<< ', err);
      }
    );
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
                surveyName: this.name ? this.name : this.selectedSurvey,
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
                    score: element.score
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
                    score: ans.score,
                    delete: false,
                  });
                } else {
                  payload['ProcessVariables']['optionsInput'].push({
                    id: element.id,
                    category_id: id,
                    category_name: category,
                    option: element.answer,
                    score: element.score,
                    delete: true,
                  });
                }
              });
              this.appService.updateQuestion(payload).subscribe(
                (res) => {
                  let load = { ProcessVariables: { surveyName: this.name ? this.name : this.selectedSurvey } };
                  this.commonMethod(load);
                  this.toastr.success('Question and answers modified successfully', 'Success');
                  this.isLoad = true;
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this question?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.datas.forEach((data) => {
          if (data.category === category) {
            let question = data.questions.filter((ques) => ques.id === id);
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
                let load = { ProcessVariables: { surveyName: this.name ? this.name : this.selectedSurvey } };
                this.commonMethod(load);
                Swal.fire(
                  'Deleted!',
                  'Question deleted successfully.',
                  'success'
                );
                this.isLoad = true;
              },
              (err) => {
                console.log('err <<< ', err);
              }
            );
          }
        });
      } else {
      }
    });
  }

  commonMethod(payload) {
    this.appService.getAllQuestionaries(payload).subscribe((res) => {
      this.isLoad = false;
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
              answer.push({ id: inn_ans['id'], answer: inn_ans['option'], score: inn_ans['score'] });
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
      this.noRecords = arr.length > 0 ? false : true;
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.datas = arr;
    });
  }

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    public survey: SurveyService,
    private snackBar: MatSnackBar,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    let payloadSur = { ProcessVariables: {} };
    this.survey.listSurvey(payloadSur).subscribe((res) => {
      let result = res['ProcessVariables'];
      result['surveyList'].forEach((element) => {
        this.surveyNameList.push(element.surveyName);
        if (element) {
          this.selectedSurvey = element.surveyName;
          let payload = {
            ProcessVariables: { surveyName: element.surveyName },
          };
          this.commonMethod(payload);
          this.isLoad = true;
        }
      });
      this.surveyNameList = [...this.surveyNameList];
    });
  }
}
