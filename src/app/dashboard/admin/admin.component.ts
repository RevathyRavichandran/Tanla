import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { UserService } from '../../../app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  isLoad = false;
  totalPages = 100;
  currentPage = 1;
  pageSize = 10;
  noRecords = false;
  fileName = null;
  fileContent = '';
  fileSize = 0;
  displayedColumns: string[] = [
    'userid',
    'username',
    'emailId',
    'employeeNo',
    'dept',
    'phone',
    'designation',
    'employee_role',
    'ActiveDeActive',
    'action'
  ];
  role: boolean = true;

  dataSource = new MatTableDataSource([]);
  userList : any = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public toastr: ToastrService,
     public user: UserService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    if (!this.role) {
      this.displayedColumns= [
        'userid',
        'username',
        'emailId',
        'employeeNo',
        'dept',
        'phone',
        'designation',
        'employee_role',
        'ActiveDeActive'
      ];
    }
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }
  

  commonMethod(payload) {
    this.isLoad = true;
    this.user.listUser(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.totalPages = result['totalPages'] * 10;
      this.currentPage = result['currentPage'];
      this.pageSize = result['perPage'];
      this.noRecords = result['employeeDetails'] ? false : true;
      this.isLoad = false;
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.dataSource = new MatTableDataSource(result['employeeDetails']);
      this.userList = result['employeeDetails'];
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

  createUser() {
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let payload = { ProcessVariables: { currentPage: 1 } };
        this.commonMethod(payload);
      }
    });
  }

  modifyUser(id) {
    let user = this.userList.filter((val) => val.id === id)[0];
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '1000px',
      data: user,
    });
    dialogRef.afterClosed().subscribe((res) => {      
        let payload = { ProcessVariables: { currentPage: 1 } };
        this.commonMethod(payload);      
    });
  }

  deactivateUser(id) {
    let userList = this.userList.filter((val) => val.userid !== id);
    this.userList = [...userList];
  }

  goToAudit() {
    this.router.navigate(['/audit']);
  }
}
