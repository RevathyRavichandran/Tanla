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
  companyList: any = [];
  data = { selected_company: "", expiry_limit: null, skip_limit: null };

  constructor(public config: ConfigService, private snackBar: MatSnackBar) {}

  submit() {
    let a = moment(new Date(),'MM/DD/YYYY');
    let b = moment(this.data.expiry_limit,'MM/DD/YYYY');
    let diffDays = b.diff(a, 'days');
    this.config.updateConfig({ ProcessVariables: {...this.data, expiry_limit: diffDays.toString(), skip_limit: this.data.skip_limit.toString() }}).subscribe(
      res => {
        this.data = { selected_company: "", expiry_limit: null, skip_limit: null };
      }
    );
  }

  ngOnInit() {
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }

  showCompany(event) {
    let payload = { ProcessVariables: { selected_company: event.target.value } }
    this.commonMethod(payload);
  }

  commonMethod(payload) {
    this.isLoad = true;
    this.config.listConfig(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.companyList = result['companyList'];
      this.noRecords = result['companyList'] ? false : true;
      this.isLoad = false;
      if (result['selected_company'] !== '') {
        let d = new Date();
        d.setDate(d.getDate() + +result['expiry_limit']);
        this.data.expiry_limit = d;
        this.data.skip_limit = result['skip_limit'];
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
