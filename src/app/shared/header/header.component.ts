import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  email: any;
  constructor(public router: Router, public login: LoginService) {}

  ngOnInit() {
    this.email = localStorage.getItem('email')
  }
  logout() {
    let payload = {
      "ProcessVariables": {"emailId":localStorage.getItem('email')}
      }
    this.login.logout(payload).subscribe(res => {
      localStorage.setItem('loginCheck', res.ProcessVariables.login_status);
      this.router.navigateByUrl('/login');
    })
  }
}
