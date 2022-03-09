import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { UserService } from '../../../app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  isLoad = false;
  totalPages = 100;
  currentPage = 1;
  pageSize = 10;
  noRecords = false;
  fileName = null;
  fileContent = '';
  fileSize = 0;
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
     public user: UserService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }
  

  commonMethod(payload) {
    this.isLoad = true;
    this.user.audit(payload).subscribe((res) => {
      console.log(res)
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.totalPages = result['total_pages'] * 5;
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
    let payload = { ProcessVariables: { currentPage: event } };
    this.commonMethod(payload);
  }

  goToAdmin() {
    this.router.navigate(["/admin"]);
  }
}
