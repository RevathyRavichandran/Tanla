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
    'feedbackQuestion',
    'feedbackAnswer',
    'employeeName',
    'employeePhoneNumber',
    'employeeCompany',
    'createdDate',
  ];
  totalPages = 100;
  currentPage = 1;
  pageSize = 10;
  data = [];

  dataSource = new MatTableDataSource([]);
  filteredSearch: Observable<any[]>;
  selectedValue = { label: 'Phone', value: 'employeePhoneNumber' };
  values = [];
  searchByValues = [
    { label: 'Question', value: 'feedbackQuestion' },
    { label: 'Answer', value: 'feedbackAnswer' },
    { label: 'Name', value: 'employeeName' },
    { label: 'Phone', value: 'employeePhoneNumber' },
    { label: 'Company', value: 'employeeCompany' },
    { label: 'Detractor', value: 'detractor' },
    { label: 'Passive', value: 'passive' },
    { label: 'Promotor', value: 'promotor' }
  ];

  searchContext = [];

  constructor(private feedbackService: FeedbackService, private matSnackbar: MatSnackBar) {
    this.fg = new FormGroup({
      searchByFun: new FormControl({ label: 'Phone', value: 'employeePhoneNumber' }),
      searchCtrl: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
    this.searchContext = [];
    this.filteredSearch = this.fg.get('searchCtrl').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search ? this.filterSearchContext(search) : this.searchContext.slice()
      )
    );
  }

  pageChanged(event) {
    let payload = { ProcessVariables: { selectedField: '1' } };
    this.commonMethod(payload);
  }

  apply() {
    let filteredVal = this.fg.value;
    let value = this.selectedValue.value;
    let payload = {};
    if (
      filteredVal.searchCtrl &&
      filteredVal.startDate &&
      filteredVal.endDate && value === 'employeePhoneNumber'
    ) {
      const startDate = moment(filteredVal.startDate).format('YYYY-MM-DD');
      const endDate = moment(filteredVal.endDate).format('YYYY-MM-DD');
      payload = {
        ProcessVariables: {
          selectedField: '4',
          selectedValue: filteredVal.searchCtrl,
          fromDate: startDate,
          toDate: endDate,
        },
      };
    } else if (filteredVal.startDate && filteredVal.endDate) {
      const startDate = moment(filteredVal.startDate).format('YYYY-MM-DD');
      const endDate = moment(filteredVal.endDate).format('YYYY-MM-DD');
      payload = {
        ProcessVariables: {
          selectedField: '3',
          fromDate: startDate,
          toDate: endDate,
        },
      };
    } else if (filteredVal.searchCtrl) {
      var select;
      if (value == 'feedbackQuestion') {
        select = '6';
      } else if (value === 'employeeCompany') {
        select = '5';
      } else if (value === 'feedbackAnswer') {
        select = '7';
      } else if (value === 'employeeName') {
        select = '11';
      } else if (value === 'employeePhoneNumber') {
        select = '2';
      } else if (value === 'passive') {
        select = '9';
      } else if (value === 'detractor') {
        select = '8';
      } else if (value === 'promotor') {
        select = '10';
      }
      payload = {
        ProcessVariables: {
          selectedField: select,
          selectedValue: filteredVal.searchCtrl,
        },
      };
    } else {
      payload = { ProcessVariables: { selectedField: '1' } };
    }
    this.commonMethod(payload);
  }

  filterSearchContext(name: any) {
    return this.searchContext.filter(
      (search) => search.value.toString().toLowerCase().indexOf(name.toString().toLowerCase()) === 0
    );
  }

  downloadTemplate() {
    this.isLoad = true;
    let payload = { ProcessVariables: { selectedField: '1', perPage: 1000000 } };
    this.feedbackService.getAllFeedback(payload).subscribe(
      (res) => {
        if (res['ProcessVariables']['lastMessageAuditList']) {
          let content =
            'Question,Answer,Employee Name,Employee Phone Number,Company,Created Date,,\n';
          res['ProcessVariables']['lastMessageAuditList'].forEach((val) => {
            content += `${val['feedbackQuestion']},${val['feedbackAnswer']},${val['employeeName']},${val['employeePhoneNumber']},${val['employeeCompany']},${val['createdDate']},,\n`;
          });
          const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
          saveAs(file, 'Feedback');
          this.isLoad = false;
        } else {
          this.isLoad = false;
          this.matSnackbar.open('There is a problem downloading the data!!!', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['error-snack-bar']
          });
        }
      },
      (err) => {
        this.isLoad = false;
        console.log(err);
        this.matSnackbar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar']
        });
      }
    );
  }

  onSelectionChanged(event) {
    console.log(event);
    this.values.push(event.option.value);
  }

  onLoadDropdown() {
    this.fg.get('searchCtrl').reset();
    this.selectedValue = this.fg.get('searchByFun').value;
    let value = this.selectedValue.value;
    this.searchContext = [];
    let arr = [];
    if (value === "detractor") {
      this.searchContext = [{ label: 6, value: 6 }, { label: 7, value: 7 }];
    } else if (value === "passive") {
      this.searchContext = [{ label: 7, value: 7 }, { label: 8, value: 8 }];
    } else if (value === "promotor") {
      [0, 1, 2, 3, 4, 5, 6].forEach(val => {
        this.searchContext.push({ label: val, value: val });
      })
    } else {
      this.data.forEach(element => {
        if (!arr.includes(element[value])) {
          arr.push(element[value]);
          this.searchContext.push({ label: element[value], value: element[value] });
        }
      });
    }
    this.filteredSearch = this.fg.get('searchCtrl').valueChanges.pipe(
      startWith(''),
      map((search) =>
        search ? this.filterSearchContext(search) : this.searchContext.slice()
      )
    );
  }

  remove(value) {
    this.values = this.values.filter(val => val !== value);
  }

  clear() {
    this.values = [];
    this.fg.reset();
    this.selectedValue = { label: 'Phone', value: 'employeePhoneNumber' };
    this.fg.get('searchByFun').setValue(this.selectedValue);
    let payload = { ProcessVariables: { selectedField: '1' } };
    this.commonMethod(payload);
  }

  commonMethod(payload) {
    this.isLoad = true;
    this.feedbackService.getAllFeedback(payload).subscribe((res) => {
      let result = res['ProcessVariables'];
      this.totalPages = result['totalItems'];
      this.currentPage = result['currentPage'];
      this.pageSize = result['perPage'];
      this.noRecords = result['lastMessageAuditList'] ? false : true;
      result['lastMessageAuditList'].forEach(date => {
        date.creDate = '';
        date.phone = '';
        let serv_utc = moment.utc(date.createdDate, "YYYY-MM-DD HH:mm:ss").toDate();
        date.creDate = moment(serv_utc,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        if (date.employeePhoneNumber.startsWith("+")) {
          date.phone =  date.employeePhoneNumber.substring(0, 3) + " " + date.employeePhoneNumber.substring(3, 8) + " " + date.employeePhoneNumber.substring(8, date.employeePhoneNumber.length);
        } else {
          date.phone = '+91 ' + date.employeePhoneNumber.substring(0, 5) + " " + date.employeePhoneNumber.substring(5, date.employeePhoneNumber.length);
        }
      });
      this.isLoad = false;
      if (this.noRecords) {
        this.matSnackbar.open('No records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar']
        });
      }
      this.onLoadDropdown();
      this.dataSource = new MatTableDataSource(result['lastMessageAuditList']);
    }),
      (err) => {
        this.noRecords = false;
        console.log(err);
        this.isLoad = false;
        this.matSnackbar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar']
        });
      };
  }

  ngOnInit(): void {
    let payload = { ProcessVariables: { selectedField: '1' } };
    let body = { ProcessVariables: { selectedField: '1', perPage: 100000 }}
    this.feedbackService.getAllFeedback(body).subscribe((res) => {
      this.data = res['ProcessVariables']['lastMessageAuditList'];
      this.commonMethod(payload);
    });
  }
}
