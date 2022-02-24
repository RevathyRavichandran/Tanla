import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { dashboardService } from '../services/dashboard.service';
import { SurveyService } from '../services/survey.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboaService: dashboardService,
    private surveySer: SurveyService,
    public toastr: ToastrService
  ) {}
  promotersPercentage: any;
  passivesPercentage: any;
  detractorsPercentage: any;
  overallScore: any;
  survey: boolean = true;
  question: boolean = false;
  date: boolean = false;
  filteredPromo = 'NA';
  filteredDetractor = 'NA';
  filteredPassive = 'NA';
  totalCount = '';
  filteredOverall = 'NA';
  filteredPromoCount = '';
  filteredDetractorCount = '';
  filteredPassiveCount = '';
  isLoad: boolean = false;
  surveyNameList: any = [];
  questionList: any = [];
  selectedSurvey: string[];
  selectedQuestion: string[];
  searchSurvey: any = ['No Records'];
  searchQues: any = ['No Records'];
  totalRes = '';
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  latestSurvey = '';

  ngOnInit() {
    let live = { ProcessVariables: {} };
    this.surveySer.listSurvey(live).subscribe((res) => {
      res.ProcessVariables.surveyList.forEach((element) => {
        if (element && element.activeStatus == 1) {
          this.latestSurvey = element.surveyName;
          let payload = {
            ProcessVariables: { surveyName: element.surveyName },
          };
          this.dashboaService
            .getDashboardPercentage(payload)
            .subscribe((res) => {
              if (res && res.ProcessVariables) {
                this.totalRes = res.ProcessVariables.npsFeedbackCount;
                this.overallScore = res.ProcessVariables.overallCount;
                this.promotersPercentage = parseFloat(
                  res.ProcessVariables.promoPercentage
                ).toFixed(2);
                this.passivesPercentage = parseFloat(
                  res.ProcessVariables.passivePercentage
                ).toFixed(2);
                this.detractorsPercentage = parseFloat(
                  res.ProcessVariables.detractorsPercentage
                ).toFixed(2);
              }
            });
        }
      });
    });

    let payloadSur = { ProcessVariables: {} };
    this.dashboaService.getQuestion(payloadSur).subscribe((res) => {
      this.surveyNameList = [...res.surveyList];
    });
  }

  weekData(color) {
    this.survey = true;
    this.question = false;
    this.date = false;
    document.getElementById('week').style.background = color;
    document.getElementById('month').style.background = 'none';
    document.getElementById('year').style.background = 'none';
  }
  monthData(color) {
    this.survey = true;
    this.question = true;
    this.date = false;
    this.selectedSurvey = null;
    document.getElementById('week').style.background = 'none';
    document.getElementById('month').style.background = color;
    document.getElementById('year').style.background = 'none';
  }
  yearData(color) {
    this.survey = false;
    this.question = false;
    this.date = true;
    document.getElementById('week').style.background = 'none';
    document.getElementById('month').style.background = 'none';
    document.getElementById('year').style.background = color;
  }
  filter() {
    this.isLoad = true;
    if (this.survey && !this.question) {
      if (this.selectedSurvey !== null) {
        let payload = {
          ProcessVariables: {
            selectedField: '1',
            selectedValue: this.selectedSurvey,
          },
        };
        this.commonMethod(payload, '');
      } else {
        this.isLoad = false;
        this.toastr.error('Please fill survey name', 'Required');
      }
    } else if (this.date) {
      let dateFromFilter = (<HTMLInputElement>document.getElementById('date1'))
        .value;
      let dateToFilter = (<HTMLInputElement>document.getElementById('date2'))
        .value;
      if (
        dateFromFilter !== null &&
        dateFromFilter !== '' &&
        dateToFilter !== null &&
        dateToFilter !== '' &&
        this.selectedSurvey
      ) {
        let payload = {
          ProcessVariables: {
            selectedField: '2',
            fromDate: dateFromFilter,
            toDate: dateToFilter,
          },
        };
        this.commonMethod(payload, '');
      } else {
        this.isLoad = false;
        this.toastr.error(
          'Please fill all date fields and survey name',
          'Required'
        );
      }
    } else if (this.question) {
      if (this.selectedSurvey !== null && this.selectedQuestion !== null) {
        let payload = {
          ProcessVariables: {
            selected_survey: this.selectedSurvey,
            selected_question: this.selectedQuestion,
          },
        };
        this.questionMethod(payload);
      } else {
        this.isLoad = false;
        this.toastr.error('Please fill survey name and question', 'Required');
      }
    }
  }
  questionMethod(payload) {
    this.dashboaService.questionCal(payload).subscribe((res) => {
      this.filteredPromoCount = res.promoCount;
      this.filteredDetractorCount = res.detractCount;
      this.filteredPassiveCount = res.passiveCount;
      this.filteredPromo = res.promoPercentage;
      this.filteredDetractor = res.detractorsPercentage;
      this.filteredPassive = res.passivePercentage;
      this.totalCount = res.totalCount;
      this.filteredOverall = res.overallPercentage;
      this.toastr.success('Filtered applied successfully', 'Success');
    });
  }
  changeFn(selection) {
    if (selection && this.question) {
      this.selectedQuestion = null;
      let process = {
        ProcessVariables: {
          selected_survey: selection,
          selected_question: null,
        },
      };
      this.dashboaService.getQuestion(process).subscribe((res) => {
        this.questionList = [...res.questionList];
      });
    }
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
      this.surveySer.fetchSurvey(payload).subscribe((res) => {
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
  searchQuestion(value) {
    this.searchQues = [];
    let payload = {
      ProcessVariables: {
        selectedValue2: '',
        searchValue2: value,
      },
    };
    if (value !== '' && value !== null) {
      this.surveySer.fetchQuestion(payload).subscribe((res) => {
        if (
          res.ProcessVariables.autoFillValue &&
          res.ProcessVariables.autoFillValue.length > 0
        ) {
          res.ProcessVariables.autoFillValue.forEach((element) => {
            this.searchQues.push(element.label);
          });
        } else {
          this.searchQues = ['No Records'];
        }
      });
    } else {
      this.searchQues = ['No Records'];
    }
  }
  clear() {
    if (this.survey && !this.question) {
      this.selectedSurvey = null;
      let payload = {
        ProcessVariables: {
          selectedField: '1',
          fromDate: '',
          toDate: '',
        },
      };
      this.commonMethod(payload, 'clear');
    } else if (this.date) {
      (<HTMLInputElement>document.getElementById('date1')).value = '';
      (<HTMLInputElement>document.getElementById('date2')).value = '';
      let payload = {
        ProcessVariables: {
          selectedField: '2',
          fromDate: '',
          toDate: '',
        },
      };
      this.commonMethod(payload, 'clear');
    } else if (this.question) {
      this.selectedSurvey = null;
      this.selectedQuestion = null;
      let payload = {
        ProcessVariables: {
          selected_survey: '',
          selected_question: '',
        },
      };
      this.questionMethod(payload);
    }
  }
  commonMethod(val, clear) {
    this.dashboaService.getChartData(val).subscribe((res) => {
      this.filteredPromo = res.promoPercentage;
      this.filteredDetractor = res.detractorsPercentage;
      this.filteredPassive = res.passivePercentage;
      this.filteredPromoCount = res.promoCount;
      this.filteredDetractorCount = res.detractCount;
      this.filteredPassiveCount = res.passiveCount;
      this.totalCount = res.totalCount;
      this.filteredOverall = res.overallPercentage;
      if (clear == 'clear') {
        this.toastr.success('Filtered cleared successfully', 'Success');
      } else {
        this.toastr.success('Filtered applied successfully', 'Success');
      }
      this.isLoad = false;
    });
  }
}
