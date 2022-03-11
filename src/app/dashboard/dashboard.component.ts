import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { dashboardService } from '../services/dashboard.service';
import { SurveyService } from '../services/survey.service';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js';

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
  proCount = '';
  pasCount = '';
  detCount = '';
  totCount = '';
  filteredOverall = 'NA';
  filteredPromoCount = '';
  filteredDetractorCount = '';
  filteredPassiveCount = '';
  isLoad: boolean = false;
  surveyNameList: any = [];
  questionList: any = [];
  serviceList: any = [];
  selectedSurvey: string[];
  selectedQuestion: string[];
  date12: any = [];
  startDate: any;
  endDate: any;
  searchSurvey: any = ['No Records'];
  searchQues: any = ['No Records'];
  totalRes = '';
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  latestSurvey = '';
  toppings = new FormControl();
  surveyList = new FormControl();
  categoryList = new FormControl();
  totalFilRes = '';
  avg = '';
  data: boolean = false;
  chart1: any;
  chart: any;

  ngOnInit() {
    let live = { ProcessVariables: { perPage: 100000 } };
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
                this.proCount = res.ProcessVariables.promoCount;
                this.pasCount = res.ProcessVariables.passiveCount;
                this.detCount = res.ProcessVariables.detractorsCount;
                this.totCount = res.ProcessVariables.overallCount;
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

    let payloadSur = {
      ProcessVariables: {
        selectedSurveyName: '',
        selected_question: '',
        selectedQuestionType: '',
      },
    };
    this.dashboaService.listdashboard(payloadSur).subscribe((res) => {
      this.surveyNameList = [...res.surveyList];
      this.serviceList = [...res.catagoryList];
      this.questionList = [...res.questionList];
    });
    if (!this.data) {
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ['Promotor(0%)', 'Passive(0%)', 'Detractor(0%)'],
          datasets: [
            {
              data: [100, 0, 0],
              backgroundColor: [
                'rgba(173, 169, 231, 0.5)',
                'rgba(173, 169, 231, 0.5)',
                'rgba(173, 169, 231, 0.5)',
              ],
            },
          ],
        },
        options: {
          legend: {
            position: 'right',
            labels: {
              fontSize: 16,
            },
          },

          // responsive: false,
          // cutoutPercentage: 75,
          tooltips: {
            enabled: false,
          },
        },
      });
    }
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
  addNewDate(event) {
    this.endDate = event.value;
    if (this.endDate) {
      let payloadSur = {
        ProcessVariables: {
          from_date: this.startDate,
          to_date: this.endDate,
          selectedSurveyName: '',
          selected_question: '',
          selectedQuestionType: '',
        },
      };
      this.dashboaService.listdashboard(payloadSur).subscribe((res) => {
        if (res.surveyList) {
          this.surveyNameList = [...res.surveyList];
          this.serviceList = [...res.catagoryList];
          this.questionList = [...res.questionList];
        } else {
          this.surveyNameList = [];
          this.serviceList = [];
          this.questionList = [];
        }
      });
    }
  }
  endNewDate(event) {
    this.startDate = event.value;
  }
  filter() {
    if (
      !this.categoryList.value &&
      !this.surveyList.value &&
      !this.toppings.value &&
      !this.startDate &&
      !this.endDate
    ) {
      this.toastr.error(
        'Please select any one filter to see the results',
        'Error'
      );
    } else {
      this.data = true;
      this.isLoad = true;
      let payload = {
        ProcessVariables: {
          selectedQuestionType: this.categoryList.value,
          selectedSurveyName: this.surveyList.value,
          selected_question: this.toppings.value,
          from_date: this.startDate ? this.startDate : '',
          to_date: this.endDate ? this.endDate : '',
        },
      };
      this.dashboaService.dashCal(payload).subscribe((res) => {
        if (res) {
          this.filteredPromo = res.promoPercentage;
          this.filteredDetractor = res.detractorsPercentage;
          this.filteredPassive = res.passivePercentage;
          this.filteredPromoCount = res.promoCount;
          this.filteredDetractorCount = res.detractCount;
          this.filteredPassiveCount = res.passiveCount;
          this.filteredOverall = res.overallPercentage;
          this.totalFilRes = res.total;
          this.avg = res.avg_rating;
          if (
            this.filteredPromo === '0' &&
            this.filteredPassive === '0' &&
            this.filteredDetractor === '0'
          ) {
            this.chart1 = false;
            this.chart = new Chart('canvas', {
              type: 'doughnut',
              data: {
                labels: ['Promotor(0%)', 'Passive(0%)', 'Detractor(0%)'],
                datasets: [
                  {
                    data: [100, 0, 0],
                    backgroundColor: [
                      'rgba(173, 169, 231, 0.5)',
                      'rgba(173, 169, 231, 0.5)',
                      'rgba(173, 169, 231, 0.5)',
                    ],
                  },
                ],
              },
              options: {
                legend: {
                  position: 'right',
                  labels: {
                    fontSize: 16,
                  },
                },
      
                // responsive: false,
                // cutoutPercentage: 75,
                tooltips: {
                  enabled: false,
                },
              },
            });
          } else {
            this.chart = false;
            
            this.chart1 = new Chart('canvas1', {
              type: 'doughnut',
              data: {
                labels: [
                  'Promotor(' + this.filteredPromoCount + ')',
                  'Passive(' + this.filteredPassiveCount + ')',
                  'Detractor(' + this.filteredPassiveCount + ')',
                ],
                datasets: [
                  {
                    data: [
                      parseInt(this.filteredPromo),
                      parseInt(this.filteredPassive),
                      parseInt(this.filteredDetractor),
                    ],
                    backgroundColor: ['#3cb371', '#ef820d', '#dc143c'],
                  },
                ],
              },
              options: {
                legend: {
                  position: 'right',
                  labels: {
                    fontSize: 16,
                  },
                },
                // responsive: false,
                // cutoutPercentage: 75,
                tooltips: {
                  enabled: true,
                },
              },
            });
          }
        }
        setTimeout(() => {
          this.isLoad = false;
        }, 300);
        this.toastr.success('Filtered applied successfully', 'Success');
      });
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
    if (selection) {
      let payloadSur = {
        ProcessVariables: {
          selectedSurveyName: selection,
          selected_question: '',
          selectedQuestionType: '',
        },
      };
      this.dashboaService.listdashboard(payloadSur).subscribe((res) => {
        this.surveyNameList = [...res.surveyList];
        this.serviceList = [...res.catagoryList];
        this.questionList = [...res.questionList];
      });
    }
  }
  changeFn1(selection) {
    if (selection && this.surveyList.value) {
      let payloadSur = {
        ProcessVariables: {
          selectedSurveyName: this.surveyList.value,
          selected_question: '',
          selectedQuestionType: selection,
        },
      };
      this.dashboaService.listdashboard(payloadSur).subscribe((res) => {
        this.surveyNameList = [...res.surveyList];
        this.serviceList = [...res.catagoryList];
        this.questionList = [...res.questionList];
      });
    } else {
      let payloadSur = {
        ProcessVariables: {
          selectedSurveyName: this.surveyList.value,
          selected_question: '',
          selectedQuestionType: selection,
        },
      };
      this.dashboaService.listdashboard(payloadSur).subscribe((res) => {
        this.surveyNameList = [...res.surveyList];
        this.serviceList = [...res.catagoryList];
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
    window.location.reload();
    this.toastr.success('Filtered cleared successfully', 'Success');
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
