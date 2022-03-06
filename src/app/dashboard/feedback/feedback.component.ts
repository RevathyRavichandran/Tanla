import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedbackService } from '../../../app/services/feedback.service';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
export interface StateGroup {
  letter: string;
  names: string[];
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  isLoad = false;
  noRecords = false;
  fg: FormGroup;
  displayedColumns: string[] = [
    'id',
    'surveyType',
    'survey_name',
    'feedback_question_type',
    'feedback_question',
    'feedback_answer',
    'score',
    'employee_name',
    'employee_phone_number',
    'employee_company',
    'created_at',
  ];
  totalPages = 100;
  currentPage = 1;
  pageSize = 10;
  data = [];
  advFilter = false;
  img = 'assets/tanla_advanced_filter.svg';
  downloadFeedback = '';
  downloadFeedbackName = '';

  searchSurvey=[];
  promo = new FormControl();
  pass = new FormControl();
  det = new FormControl();
  promotor: boolean=false;
  detractor: boolean=false;
  passive: boolean=false;
  dataSource = new MatTableDataSource([]);
  filteredSurveySearch: Observable<any[]>;
  filteredMobileSearch: Observable<any[]>;
  filteredCompanySearch: Observable<any[]>;
  filteredQuestionSearch: Observable<any[]>;
  filteredCategorySearch: Observable<any[]>;
  filteredAnswerSearch: Observable<any[]>;
  filteredDetractorsSearch: Observable<any[]>;
  filteredPassivesSearch: Observable<any[]>;
  filteredPromotorsSearch: Observable<any[]>;
  filteredScoreSearch: Observable<any[]>;
  searchSurveyContext = [];
  searchMobileContext = [];
  searchCompanyContext = [];
  searchCategoryContext = [];
  searchQuestionContext = [];
  searchAnswerContext = [];
  searchDetractorsContext = [];
  searchPassivesContext = [];
  searchPromotorsContext = [];
  searchScoreContext = [];
  filterSur = [];
  filterSer = [];
  filterCom = [];
  filterQue = [];
  filterAns = [];
  filterSurType = [];

  toppings = new FormControl();
  isExpandCategory: boolean[] = [];

  states = new FormControl();
  categoryList = new FormControl();

  surveyList: any = [];
  selected_survey: string[];
  expandDocumentTypes(group: any) {
    this.isExpandCategory[group.letter] = !this.isExpandCategory[group.letter];
    // expand only selected parent dropdown category with that childs
  }

  toggleSelection(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.names);
    } else {
      group.names.forEach((x: string) => states.splice(states.indexOf(x), 1));
    }
    this.states.setValue(states);
  }

  stateList: StateGroup[] = [
    {
      letter: 'Promoters',
      names: ['9', '10']
    },
    {
      letter: 'Passive',
      names: ['7', '8'],
    },
    {
      letter: 'Detractor',
      names: ['0', '1', '2', '3', '4', '5', '6'],
    },
  ];

  constructor(
    private feedbackService: FeedbackService,
    private matSnackbar: MatSnackBar,
    public toastr: ToastrService
  ) {
    this.fg = new FormGroup({
      survey: new FormControl(null),
      surveyType: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      mobile: new FormControl(null),
      company: new FormControl(null),
      question: new FormControl(null),
      answer: new FormControl(null),
      detractors: new FormControl(null),
      passives: new FormControl(null),
      promotors: new FormControl(null),
      score: new FormControl(null),
      category: new FormControl(null)
    });
    this.searchSurveyContext = [];
    this.searchMobileContext = [];
    this.searchCompanyContext = [];
    this.searchQuestionContext = [];
    this.searchAnswerContext = [];
    this.searchDetractorsContext = [];
    this.searchPassivesContext = [];
    this.searchPromotorsContext = [];
    this.searchScoreContext = [];
    this.searchCategoryContext = [];
    this.filterCommonMethod();
  }

  filterCommonMethod() {
    this.filteredSurveySearch = this.fg.get('survey').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchSurveyContext)
          : this.searchSurveyContext.slice()
      )
    );
    this.filteredCategorySearch = this.fg.get('category').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchCategoryContext)
          : this.searchCategoryContext.slice()
      )
    );
    this.filteredMobileSearch = this.fg.get('mobile').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchMobileContext)
          : this.searchMobileContext.slice()
      )
    );
    this.filteredCompanySearch = this.fg.get('company').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchCompanyContext)
          : this.searchCompanyContext.slice()
      )
    );
    this.filteredQuestionSearch = this.fg.get('question').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchQuestionContext)
          : this.searchQuestionContext.slice()
      )
    );
    this.filteredAnswerSearch = this.fg.get('answer').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchAnswerContext)
          : this.searchAnswerContext.slice()
      )
    );
    this.filteredDetractorsSearch = this.fg.get('detractors').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchDetractorsContext)
          : this.searchDetractorsContext.slice()
      )
    );
    this.filteredPassivesSearch = this.fg.get('passives').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchPassivesContext)
          : this.searchPassivesContext.slice()
      )
    );
    this.filteredPromotorsSearch = this.fg.get('promotors').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchPromotorsContext)
          : this.searchPromotorsContext.slice()
      )
    );
    this.filteredScoreSearch = this.fg.get('score').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search
          ? this.filterSearchContext(search, this.searchScoreContext)
          : this.searchScoreContext.slice()
      )
    );
  }

  toggle() {
    this.advFilter = !this.advFilter;
    this.img = this.advFilter
      ? 'assets/tanla_advanced_filter_onclick.svg'
      : 'assets/tanla_advanced_filter.svg';
  }

  pageChanged(event) {
    let payload = { ProcessVariables: { selectedField: '1' } };
    this.commonMethod(payload);
  }

  searchData(value) {
    this.searchSurvey = [];
    let payload = {
      ProcessVariables: {
        selectedField: '1',
        searchValue: value,
      },
    };
    if (value !== '' && value !== null) {
      this.feedbackService.autofill(payload).subscribe((res) => {
        if (
          res.ProcessVariables.autoFillValue &&
          res.ProcessVariables.autoFillValue.length > 0
        ) {
          res.ProcessVariables.autoFillValue.forEach((element) => {
            this.searchSurvey.push(element.label);
          });
        } else {
          this.searchSurvey = ['No Records'];
        }
      });
    } else {
      this.searchSurvey = ['No Records'];
    }
  }

  showSurvey(event) {
    this.filterSur = [];
    let payload = {
      "ProcessVariables":{"surveyName":event.target.value,"feedbackQuestion":"","feedbackQuestionType":"","feedbackAnswer":"","score":"","employee_company":""}
      }
    this.feedbackService.autofill(payload).subscribe(res => {
      if (res.ProcessVariables.output_data) {
        res.ProcessVariables.output_data.forEach(element => {
          this.filterSur.push(element.label)
        });
      }
    })
  }

  showSurveyType(event) {
    this.filterSurType = [];
    let payload = {
      "ProcessVariables":{"surveyName":"", "surveyType": event.target.value, "feedbackQuestion":"","feedbackQuestionType":"","feedbackAnswer":"","score":"","employee_company":""}
      }
    this.feedbackService.autofill(payload).subscribe(res => {
      if (res.ProcessVariables.output_data) {
        res.ProcessVariables.output_data.forEach(element => {
          this.filterSurType.push(element.label)
        });
      }
    })
  }

  showCategory(event) {
    this.filterSer = [];
    let payload = {
      "ProcessVariables":{"surveyName":"","feedbackQuestion":"","feedbackQuestionType":event.target.value,"feedbackAnswer":"","score":"","employee_company":""}
      }
    this.feedbackService.autofill(payload).subscribe(res => {
      if (res.ProcessVariables.output_data) {
        res.ProcessVariables.output_data.forEach(element => {
          this.filterSer.push(element.label)
        });
      }
    })
  }
  showCompany(event) {
    this.filterCom = [];
    let payload = {
      "ProcessVariables":{"surveyName":"","feedbackQuestion":"","feedbackQuestionType":"","feedbackAnswer":"","score":"","employee_company":event.target.value}
      }
      this.feedbackService.autofill(payload).subscribe(res => {
        if (res.ProcessVariables.output_data) {
          res.ProcessVariables.output_data.forEach(element => {
            this.filterCom.push(element.label)
          });
        }
      })
  }
  showQuestion(event) {
    this.filterQue = [];
    let payload = {
      "ProcessVariables":{"surveyName":"","feedbackQuestion":event.target.value,"feedbackQuestionType":"","feedbackAnswer":"","score":"","employee_company":""}
      }
      this.feedbackService.autofill(payload).subscribe(res => {
        if (res.ProcessVariables.output_data) {
          res.ProcessVariables.output_data.forEach(element => {
            this.filterQue.push(element.label)
          });
        }
      })
  }
  showAnswer(event) {
    this.filterAns = [];
    let payload = {
      "ProcessVariables":{"surveyName":"","feedbackQuestion":"","feedbackQuestionType":"","feedbackAnswer":event.target.value,"score":"","employee_company":""}
      }
      this.feedbackService.autofill(payload).subscribe(res => {
        if (res.ProcessVariables.output_data) {
          res.ProcessVariables.output_data.forEach(element => {
            this.filterAns.push(element.label)
          });
        }
      })
  }

  apply() {
    let filteredVal = this.fg.value;
    let answer = filteredVal.answer ? filteredVal.answer : '';
    let category = filteredVal.category ? filteredVal.category : '';
    let company = filteredVal.company ? filteredVal.company : '';
    let start = filteredVal.startDate ? filteredVal.startDate : '';
    let end = filteredVal.endDate ? filteredVal.endDate : '';
    let question = filteredVal.question ? filteredVal.question : '';
    let survey = filteredVal.survey ? filteredVal.survey : '';
    let score = this.categoryList.value;
    let surType = filteredVal.surveyType ? filteredVal.surveyType : '';
    let payload = {
      ProcessVariables: {
        "from_date":start,
        "to_date":end,
        "surveyType": surType,
        "surveyName":survey,
        "feedbackQuestionType":category,
        "feedbackAnswer":answer,
        "feedbackQuestion":question,
        "score_list":score,
        "employee_company":company
      },
    }
    this.feedbackService.filterFeedback(payload).subscribe(res => {
      let result = res['ProcessVariables'];
      this.totalPages = result['totalItems'] === 0 || !result['totalItems'] ? 1 : result['totalItems'];
      this.currentPage = result['currentPage'] ? result['currentPage'] : 1;
      this.pageSize = result['perPage'];
      this.noRecords = result['outputData'] ? false : true;
      if (!this.noRecords) {

      }

      if (this.noRecords) {
        this.matSnackbar.open('No records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.downloadFeedback = result.attachment.content;
      this.downloadFeedbackName = result.attachment.name;
      this.dataSource = new MatTableDataSource(result['outputData']);
    }),
      (err) => {
        this.noRecords = false;
        console.log(err);
        this.isLoad = false;
        this.matSnackbar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      };

    // let payload = {};
    // if (
    //   filteredVal.searchCtrl &&
    //   filteredVal.startDate &&
    //   filteredVal.endDate
    // ) {
    //   const startDate = moment(filteredVal.startDate).format('YYYY-MM-DD');
    //   const endDate = moment(filteredVal.endDate).format('YYYY-MM-DD');
    //   payload = {
    //     ProcessVariables: {
    //       selectedField: '4',
    //       selectedValue: filteredVal.searchCtrl,
    //       fromDate: startDate,
    //       toDate: endDate,
    //     },
    //   };
    // } else if (filteredVal.startDate && filteredVal.endDate) {
    //   const startDate = moment(filteredVal.startDate).format('YYYY-MM-DD');
    //   const endDate = moment(filteredVal.endDate).format('YYYY-MM-DD');
    //   payload = {
    //     ProcessVariables: {
    //       selectedField: '3',
    //       fromDate: startDate,
    //       toDate: endDate,
    //     },
    //   };
    // } else if (filteredVal.searchCtrl) {
    //   var select;
    // if (value == 'feedbackQuestion') {
    //   select = '6';
    // } else if (value === 'employeeCompany') {
    //   select = '5';
    // } else if (value === 'feedbackAnswer') {
    //   select = '7';
    // } else if (value === 'employeeName') {
    //   select = '11';
    // } else if (value === 'employeePhoneNumber') {
    //   select = '2';
    // } else if (value === 'passive') {
    //   select = '9';
    // } else if (value === 'detractor') {
    //   select = '8';
    // } else if (value === 'promotor') {
    //   select = '10';
    // }
    //   payload = {
    //     ProcessVariables: {
    //       selectedField: select,
    //       selectedValue: filteredVal.searchCtrl,
    //     },
    //   };
    // } else {
    //   payload = { ProcessVariables: { selectedField: '1' } };
    // }
    // this.commonMethod(payload);
  }

  filterSearchContext(name: any, value: any) {
    return value.filter(
      (search) =>
        search.value
          .toString()
          .toLowerCase()
          .indexOf(name.toString().toLowerCase()) === 0
    );
  }

  downloadTemplate() {
    if (this.downloadFeedback) {
      let content = this.downloadFeedback;
      content = atob(content);
      const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
      saveAs(file, this.downloadFeedbackName);
      this.toastr.success('Feedback downloaded successfully', 'Success');
    } else {
      this.toastr.error('Filtered feedback is empty!', 'Error');
    }
    // this.isLoad = true;
    // let payload = {
    //   ProcessVariables: { selectedField: '1', perPage: 1000000 },
    // };

    // this.feedbackService.filterFeedback(payload).subscribe(
    //   (res) => {
    //     if (res['ProcessVariables']['outputData']) {
    //       let content =
    //         'id,Survey type,Survey name,Service,Question,Answer,Score,Employee Name,Employee Phone Number,Company,Created Date,,\n';
    //       res['ProcessVariables']['outputData'].forEach((val) => {
    //         content += `${val['id']},${val['surveyType']},${val['survey_name']},${val['feedback_question_type']},${val['feedback_question']},${val['feedback_answer']},${val['score']},${val['employee_name']},${val['employee_phone_number']},${val['employee_company']},${val['created_at']},,\n`;
    //       });
    //       const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
    //       saveAs(file, 'Feedback');
    //       this.isLoad = false;
    //     } else {
    //       this.isLoad = false;
    //       this.matSnackbar.open(
    //         'There is a problem downloading the data!!!',
    //         '',
    //         {
    //           horizontalPosition: 'right',
    //           verticalPosition: 'top',
    //           duration: 2000,
    //           panelClass: ['error-snack-bar'],
    //         }
    //       );
    //     }
    //   },
    //   (err) => {
    //     this.isLoad = false;
    //     console.log(err);
    //     this.matSnackbar.open(err, '', {
    //       horizontalPosition: 'right',
    //       verticalPosition: 'top',
    //       duration: 2000,
    //       panelClass: ['error-snack-bar'],
    //     });
    //   }
    // );
  }

  onSurveyChanged(event) {}

  onMobileChanged(event) {
    this.onLoadDropdown(
      this.data.filter(
        (val) => val['employeePhoneNumber'] === event.option.value
      )
    );
  }

  onQuestionChanged(event) {
    this.onLoadDropdown(
      this.data.filter((val) => val['feedbackQuestion'] === event.option.value)
    );
  }

  onAnswerChanged(event) {
    this.onLoadDropdown(
      this.data.filter((val) => val['feedbackAnswer'] === event.option.value)
    );
  }

  onCompanyChanged(event) {
    this.onLoadDropdown(
      this.data.filter((val) => val['employeeCompany'] === event.option.value)
    );
  }

  onNameChanged(event) {
    this.onLoadDropdown(
      this.data.filter((val) => val['employeeName'] === event.option.value)
    );
  }

  onCategoryChanged(event) {
    this.onLoadDropdown(
      this.data.filter((val) => val['catagoryName'] === event.option.value)
    );
  }

  onLoadDropdown(dataValue) {
    this.searchPromotorsContext = [
      { label: 9, value: 9 },
      { label: 10, value: 10 },
    ];
    this.searchPassivesContext = [
      { label: 7, value: 7 },
      { label: 8, value: 8 },
    ];
    this.searchDetractorsContext = [];
    this.searchCompanyContext = [];
    this.searchQuestionContext = [];
    this.searchAnswerContext = [];
    this.searchScoreContext = [
      {label: 'Promotor', value: 'Promotor'},
      {label: 'Passive', value: 'Passive'},
      {label: 'Detractor', value: 'Detractor'}
    ];
    this.searchCategoryContext = [];
    [0, 1, 2, 3, 4, 5, 6].forEach((val) => {
      this.searchDetractorsContext.push({ label: val, value: val });
    });
    let arr = [];
    if (dataValue) {
      dataValue.forEach((element) => {
      [
        'employeeCompany',
        'employeePhoneNumber',
        'feedbackAnswer',
        'feedbackQuestion',
        'catagoryName'
      ].forEach((ele, index) => {
        if (!arr.includes(element[ele])) {
          arr.push(element[ele]);
          if (index === 0) {
            this.searchCompanyContext.push({
              label: element[ele],
              value: element[ele],
            });
          } else if (index === 1) {
            this.searchMobileContext.push({
              label: element[ele],
              value: element[ele],
            });
          } else if (index === 2) {
            this.searchAnswerContext.push({
              label: element[ele],
              value: element[ele],
            });
          } else if (index === 3) {
            this.searchQuestionContext.push({
              label: element[ele],
              value: element[ele],
            });
          } else {
            this.searchCategoryContext.push({
              label: element[ele],
              value: element[ele],
            });
          }
        }
      });
    });
    }
    this.filterCommonMethod();
  }

  // remove(value) {
  //   this.values = this.values.filter(val => val !== value);
  // }

  clear() {
    this.fg.reset();
    let payload = { ProcessVariables: { selectedField: '1' } };
    this.commonMethod(payload);
  }

  commonMethod(payload) {
    this.isLoad = true;
    this.feedbackService.filterFeedback(payload).subscribe((res) => {
      let result = res['ProcessVariables'];
      this.totalPages = result['totalItems'] === 0 || !result['totalItems'] ? 1 : result['totalItems'];
      this.currentPage = result['currentPage'] ? result['currentPage'] : 1;
      this.pageSize = result['perPage'];
      this.noRecords = result['outputData'] ? false : true;
      if (!this.noRecords) {
        // result['outputData'].forEach((date) => {
        // date.creDate = '';
        // date.phone = '';
        // let serv_utc = moment
        //   .utc(date.created_at, 'YYYY-MM-DD HH:mm:ss')
        //   .toDate();
        // date.creDate = moment(serv_utc, 'YYYY-MM-DD HH:mm:ss').format(
        //   'YYYY-MM-DD HH:mm:ss'
        // );

        // if (date.employeePhoneNumber.startsWith('+')) {
        //   date.phone =
        //     date.employeePhoneNumber.substring(0, 3) +
        //     ' ' +
        //     date.employeePhoneNumber.substring(3, 8) +
        //     ' ' +
        //     date.employeePhoneNumber.substring(
        //       8,
        //       date.employeePhoneNumber.length
        //     );
        // } else {
        //   date.phone =
        //     '+91 ' +
        //     date.employeePhoneNumber.substring(0, 5) +
        //     ' ' +
        //     date.employeePhoneNumber.substring(
        //       5,
        //       date.employeePhoneNumber.length
        //     );
        // }
      // });
      }
      this.isLoad = false;
      if (this.noRecords) {
        this.matSnackbar.open('No records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.onLoadDropdown(this.data);
      this.dataSource = new MatTableDataSource(result['outputData']);
      this.downloadFeedback = result.attachment.content;
      this.downloadFeedbackName = result.attachment.name;
    }),
      (err) => {
        this.noRecords = false;
        console.log(err);
        this.isLoad = false;
        this.matSnackbar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      };
  }

  getScore(event) {
    this.promotor = event === 'Promotor' ? true: false;
    this.detractor = event === 'Detractor' ? true: false;
    this.passive = event === 'Passive' ? true: false;
  }

  ngOnInit(): void {
    let payload = { ProcessVariables: {  } };
    let body = { ProcessVariables: { selectedField: '1', perPage: 100000 } };
    this.feedbackService.filterFeedback(body).subscribe((res) => {
      this.data = res['ProcessVariables']['outputData'];
      this.commonMethod(payload);
    });
  }
}
