import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../app/services/configuration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  role: boolean = true;
  minDate: any;
  isLoad = false;
  noRecords = false;
  survey: boolean = false;
  companyList: any = [];
  surveyList: any = [];
  surveyname: string;
  surveyDate: string;
  company123: any = [];
  company: boolean = false;
  data = {
    selected_survey: '',
    selected_company: '',
    expiry_limit: null,
    skip_limit: null,
  };

  constructor(
    public config: ConfigService,
    private snackBar: MatSnackBar,
    public toastr: ToastrService
  ) {}

  submit() {
    if ((this.surveyDate && this.company123) || ((this.data.skip_limit || this.data.skip_limit == 0 ) && this.company123)) {      
      let d = new Date(this.surveyDate);
      d.setHours(0, 0, 0, 0);
      let a = moment(d, 'DD/MM/YYYY');
      let b = moment(this.data.expiry_limit, 'DD/MM/YYYY');
      let diffDays = b.diff(a, 'days');
      this.config
        .updateConfig({
          ProcessVariables: {
            selected_company: this.company123,
            selected_survey: this.data.selected_survey,
            validateTo: this.data.expiry_limit,
            expiry_limit: diffDays.toString() === 'NaN' ? '': diffDays.toString(),
            skip_limit: this.data.skip_limit.toString(),
          },
        })
        .subscribe((res) => {
          this.toastr.success('Configured successfully', 'Success');
          window.location.reload();
          this.data = {
            selected_survey: '',
            selected_company: '',
            expiry_limit: null,
            skip_limit: null,
          };
        });
    }
  }

  ngOnInit() {
    this.minDate = new Date();
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload, '');
  }

  showCompany(event) {
    let company = [];
    this.company = event.length > 0 ? true : false;
    event.forEach((element) => {
      company.push(element);
    });
    let payload = {
      ProcessVariables: {
        selected_company: company,
        selected_survey: this.surveyname,
      },
    };
    this.company123 = company;
    this.commonMethod(payload, 'company');
  }

  showSurvey(event) {
    this.data.selected_company = null;
    this.company = false;
    this.survey = event.target.value === '' ? false : true;
    this.surveyname = event.target.value;
    let payload = { ProcessVariables: { selected_survey: event.target.value } };
    this.commonMethod(payload, '');
  }

  commonMethod(payload, company) {
    this.isLoad = true;
    let index = 0;
    this.config.listConfig(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.surveyList = result['surveyList'];
      this.noRecords = result['surveyList'] ? false : true;
      this.isLoad = false;
      if (result['surveyList'] !== '') {
        this.companyList = result['selected_company'];
      }
      if (this.survey) {
        this.data.skip_limit = result['skip_limit'];
      }
      if (payload.ProcessVariables.selected_company) {
        this.companyList.forEach((company1) => {
          payload.ProcessVariables.selected_company.forEach((company2) => {
            if (company1 === company2) {
              index = this.companyList.indexOf(company1);
            }
          });
        });
      }
      if (company === 'company') {
        this.surveyDate = result['validateFrom'][index];
        let d = new Date(result['validateFrom'][index]);
        moment(
          d.setDate(d.getDate() + +result['expiry_limit'][index]),
          'DD/MM/YYYY'
        );

        this.data.expiry_limit = d;
      }
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
    }),
      (err) => {
        this.isLoad = false;
        this.noRecords = false;
        this.snackBar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
        console.log(err);
      };
  }
  close() {
    window.location.reload();
  }
}
