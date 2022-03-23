import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { UserService } from '../../../app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  isLoad = false;
  totalPages = 100;
  fg: FormGroup;
  currentPage = 1;
  pageSize = 10;
  noRecords = false;
  fileName = null;
  fileContent = '';
  fileSize = 0;
  startDate: any;
  endDate: any;
  filterUser = [];
  displayedColumns= [
    'id',
    'api_type',
    'created_at',
    'request',
    'response',
    'updated_at',
    'user_name'
  ];
  role: boolean = true;

  dataSource = new MatTableDataSource([]);
  userList : any = [];

  constructor(private snackBar: MatSnackBar, public toastr: ToastrService,
     public user: UserService, private router: Router, private cd: ChangeDetectorRef) {
      this.fg = new FormGroup({
        userName: new FormControl(null),
        startDate: new FormControl(null),
        endDate: new FormControl(null),
      });
     }

  ngOnInit() {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload, 'init');
  }


  commonMethod(payload, call) {
    this.isLoad = true;
    this.user.audit_pagination(payload).subscribe((res) => {
      if (call==='filter') {
        this.toastr.success('Filtered applied successfully', 'Success');
      }
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.totalPages = result['total_pages'] * 15;
      this.currentPage = result['current_page'];
      this.pageSize = result['perPage'];
      this.noRecords = result['outputData'] ? false : true;
      this.isLoad = false;
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.dataSource = new MatTableDataSource(result['outputData']);
      this.userList = result['outputData'];
      this.cd.detectChanges();
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

  pageChanged(event) {
    let filteredVal = this.fg.value;
    let start = filteredVal.startDate ? filteredVal.startDate : '';
    let end = filteredVal.endDate ? filteredVal.endDate : '';
    let user = filteredVal.userName ? filteredVal.userName : '';
    let payload = { ProcessVariables: { current_page: event, from_date: start, to_date: end, user_name: user } };
    this.commonMethod(payload, 'page');
  }
  showUser(event) {
    this.filterUser = [];
    let payload = {
      ProcessVariables: {
        user_name: event.target.value
      },
    };
    this.user.audit_autofill(payload).subscribe((res) => {
      if (res.ProcessVariables.output_data) {
        res.ProcessVariables.output_data.forEach((element) => {
          this.filterUser.push(element.label);
        });
        this.filterUser = [...new Set(this.filterUser)]
      }
    });
  }

  addNewDate(event) {
    this.endDate = event.value;
  }
  endNewDate(event) {
    this.startDate = event.value;
  }

  downloadTemplate() {
    let filteredVal = this.fg.value;
    let start = filteredVal.startDate ? filteredVal.startDate : '';
    let end = filteredVal.endDate ? filteredVal.endDate : '';
    let user = filteredVal.userName ? filteredVal.userName : '';
    let payload = { ProcessVariables: { from_date: start, to_date: end, user_name: user } };
    this.user.audit(payload).subscribe((res)  => {
      let result = res['ProcessVariables'];
      if (result.attachment) {
        let content = result.attachment.content;
        content = atob(content);
        const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
        saveAs(file, result.attachment.name);
        this.toastr.success('Audit report downloaded successfully', 'Success');
      } else {
        this.toastr.error('Audit report is empty!', 'Error');
      }
    });
  }

  apply() {
    let filteredVal = this.fg.value;
    let start = filteredVal.startDate ? filteredVal.startDate : '';
    let end = filteredVal.endDate ? filteredVal.endDate : '';
    let user = filteredVal.userName ? filteredVal.userName : '';
    let payload = { ProcessVariables: { currentPage: 1, from_date: start, to_date: end, user_name: user } };
    this.commonMethod(payload, 'filter');
  }

  clear() {
    this.fg.reset();
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload, 'clear');
  }

  goToAdmin() {
    this.router.navigate(["/admin"]);
  }
}
