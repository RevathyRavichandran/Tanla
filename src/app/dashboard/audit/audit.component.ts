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
      auditmobile: '9887656659',
      request: 'Request1',
      response: 'Response1',
      apiname: 'Test',
      createdat: '01/03/2021',
    },
    {
      auditid: 2,
      auditmobile: '9887656659',
      request: 'Request1',
      response: 'Response1',
      apiname: 'Test',
      createdat: '01/03/2021',
    },
    {
      auditid: 3,
      auditmobile: '9887656659',
      request: 'Request1',
      response: 'Response1',
      apiname: 'Test',
      createdat: '01/03/2021',
    },
    {
      auditid: 4,
      auditmobile: '9887656659',
      request: 'Request1',
      response: 'Response1',
      apiname: 'Test',
      createdat: '01/03/2021',
    },
    {
      auditid: 5,
      auditmobile: '9887656659',
      request: 'Request1',
      response: 'Response1',
      apiname: 'Test',
      createdat: '01/03/2021',
    },
  ];

  goToAdmin() {
    this.router.navigate(["/admin"]);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
