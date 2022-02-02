import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  page = 1;
  pageSize = 10;
  auditList: any[] = [
    {
      auditid: 1,
      auditname: 'Test1',
      emailId: 'test1@gmail.com',
    },
    {
      auditid: 2,
      auditname: 'Test2',
      emailId: 'test2@gmail.com',
    },
    {
      auditid: 3,
      auditname: 'Test3',
      emailId: 'test3@gmail.com',
    },
    {
      auditid: 4,
      auditname: 'Test4',
      emailId: 'test4@gmail.com',
    },
    {
      auditid: 5,
      auditname: 'Test5',
      emailId: 'test5@gmail.com',
    },
  ];

  goToAdmin() {
    this.router.navigate(["/admin"]);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
