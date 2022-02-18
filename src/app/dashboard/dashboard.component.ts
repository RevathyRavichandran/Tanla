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
  isLoad: boolean = false;
  surveyNameList: any = [];
  searchSurvey: any = ['No Records'];
  searchQues: any = ['No Records'];
  totalRes = '';
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.dashboaService.getDashboardPercentage().subscribe((res) => {
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
    let payloadSur = { ProcessVariables: {} };
    this.surveySer.listSurvey(payloadSur).subscribe((res) => {
      let result = res['ProcessVariables'];
      result['surveyList'].forEach((element) => {
        this.surveyNameList.push(element.surveyName);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.surveyNameList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
      let surveyFilter = (<HTMLInputElement>document.getElementById('survey'))
        .value;
      if (surveyFilter !== null && surveyFilter !== '') {
        let payload = {
          ProcessVariables: {
            selectedField: '1',
            selectedValue: surveyFilter,
          },
        };
        this.commonMethod(payload);
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
        dateToFilter !== ''
      ) {
        let payload = {
          ProcessVariables: {
            selectedField: '2',
            fromDate: dateFromFilter,
            toDate: dateToFilter,
          },
        };
        this.commonMethod(payload);
      } else {
        this.isLoad = false;
        this.toastr.error('Please fill all date fields', 'Required');
      }
    } else if (this.question) {
      let suveyFilter = (<HTMLInputElement>document.getElementById('survey'))
        .value;
      let questionFilter = (<HTMLInputElement>(
        document.getElementById('question')
      )).value;
      if (
        suveyFilter !== null &&
        suveyFilter !== '' &&
        questionFilter !== null &&
        questionFilter !== ''
      ) {
        let payload = {
          ProcessVariables: {
            selectedValue: suveyFilter,
            selectedValue2: questionFilter,
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
    this.dashboaService.getQuestionData(payload).subscribe((res) => {
      this.filteredPromo = res.promoPercentage;
      this.filteredDetractor = res.detractorsPercentage;
      this.filteredPassive = res.passivePercentage;
      this.totalCount = res.totalCount;
      this.filteredOverall = res.overallPercentage;
      this.toastr.success('Filtered applied successfully', 'Success');
    });
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
        console.log(this.searchSurvey);
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
        console.log(this.searchQues);
      });
    } else {
      this.searchQues = ['No Records'];
    }
  }
  clear() {
    if (this.survey && !this.question) {
      (<HTMLInputElement>document.getElementById('survey')).value = '';
      let payload = {
        ProcessVariables: {
          selectedField: '1',
          fromDate: '',
          toDate: '',
        },
      };
      this.commonMethod(payload);
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
      this.commonMethod(payload);
    } else if (this.question) {
      (<HTMLInputElement>document.getElementById('survey')).value = '';
      (<HTMLInputElement>document.getElementById('question')).value = '';
      let payload = {
        ProcessVariables: {
          selectedValue: '',
          selectedValue2: '',
        }
      }
      this.questionMethod(payload);
    }
  }
  commonMethod(val) {
    this.dashboaService.getChartData(val).subscribe((res) => {
      console.log(res);
      this.filteredPromo = res.promoPercentage;
      this.filteredDetractor = res.detractorsPercentage;
      this.filteredPassive = res.passivePercentage;
      this.totalCount = res.totalCount;
      this.filteredOverall = res.overallPercentage;
      this.toastr.success('Filtered applied successfully', 'Success');
      this.isLoad = false;
    });
  }
}
