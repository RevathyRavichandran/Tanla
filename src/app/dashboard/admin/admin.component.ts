import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  page = 1;
  pageSize = 10;
  userList: any[] = [
    {
      userid: 1,
      username: 'Test1',
      employeeNo: 22,
      ActiveDeActive: 'Active',
      emailId: 'test1@gmail.com',
      password: 'test',
      dept: 'IT',
      designation: 'Developer',
      phone: '2809029002',
    },
    {
      userid: 2,
      username: 'Test2',
      employeeNo: 23,
      ActiveDeActive: 'Active',
      emailId: 'test2@gmail.com',
      password: 'test1',
      dept: 'IT',
      designation: 'Developer',
      phone: '2809029002',
    },
    {
      userid: 3,
      username: 'Test3',
      employeeNo: 25,
      ActiveDeActive: 'Active',
      emailId: 'test3@gmail.com',
      password: 'test22',
      dept: 'IT',
      designation: 'Developer',
      phone: '2809029002',
    },
    {
      userid: 4,
      username: 'Test4',
      employeeNo: 26,
      ActiveDeActive: 'Active',
      emailId: 'test4@gmail.com',
      password: 'test333',
      dept: 'IT',
      designation: 'Developer',
      phone: '2809029002',
    },
    {
      userid: 5,
      username: 'Test5',
      employeeNo: 27,
      ActiveDeActive: 'Active',
      emailId: 'test5@gmail.com',
      password: 'test4444',
      dept: 'IT',
      designation: 'Developer',
      phone: '2809029002',
    },
  ];

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  createUser() {
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '1000px',
    });
  }

  modifyUser(id) {
    let user = this.userList.filter((val) => val.userid === id)[0];
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '1000px',
      data: user,
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
