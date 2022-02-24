import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../app/services/configuration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  isLoad = false;
  noRecords = false;
  survey: boolean = false;
  companyList: any = [];
  surveyList: any = [];
  surveyname: string;
  surveyDate: string;
  company: boolean = false;
  data = { selected_survey: "", selected_company: "", expiry_limit: null, skip_limit: null };

  constructor(public config: ConfigService, private snackBar: MatSnackBar) {}

  submit() {
    if (this.surveyDate) {
      let d = new Date(this.surveyDate);
    d.setHours(0, 0, 0, 0);
    let a = moment(d,'DD/MM/YYYY');
    let b = moment(this.data.expiry_limit,'DD/MM/YYYY');
    let diffDays = b.diff(a, 'days');
    this.config.updateConfig({ ProcessVariables: {selected_company: this.data.selected_company, selected_survey: this.data.selected_survey, validateTo: this.data.expiry_limit, expiry_limit: diffDays.toString(), skip_limit: this.data.skip_limit.toString() }}).subscribe(
      res => {
        this.data = { selected_survey: "", selected_company: "", expiry_limit: null, skip_limit: null };
      }
    );
    } else {
      this.config.updateConfig({ ProcessVariables: {...this.data, skip_limit: this.data.skip_limit.toString() }}).subscribe(
        res => {
          this.data = { selected_survey: "", selected_company: "", expiry_limit: null, skip_limit: null };
        }
      );
    }  
  }

  ngOnInit() {
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload, '');
  }

  showCompany(event) {
    let company = [];
    this.company = event.length > 0 ? true : false;
    event.forEach(element => {      
      company.push(element)
    });
    let payload = { ProcessVariables: { selected_company: company, selected_survey: this.surveyname } }
    this.commonMethod(payload, 'company');
  }

  showSurvey(event) {
    this.data.selected_company = null;
    this.company = false;
    this.survey = event.target.value === '' ? false : true;
    this.surveyname = event.target.value;
    let payload = { ProcessVariables: { selected_survey: event.target.value } }
    this.commonMethod(payload, '');
  }

  commonMethod(payload, company) {
    this.isLoad = true;
    this.config.listConfig(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.surveyList = result['surveyList']
      this.noRecords = result['surveyList'] ? false : true;
      this.isLoad = false;
      if (result['surveyList'] !== '') {
        this.companyList = result['selected_company'];
        this.data.skip_limit = result['skip_limit'];
      }
      if (company === 'company') {
        this.surveyDate = result['validateFrom'][0];
        let d = new Date(result['validateFrom'][0]);
        moment(d.setDate(d.getDate() + +result['expiry_limit']), 'DD/MM/YYYY');
        
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
}
