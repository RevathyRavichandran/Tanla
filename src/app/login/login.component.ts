import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;

  constructor(public router: Router, public log: LoginService, public toastr: ToastrService,
    private matSnackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line: typedef
  login() {
    if (this.f.password.value === 'tanla@123') {
      this.router.navigateByUrl('/resetPassword');
    } else {
      let payload = {
        "ProcessVariables": {"emailId":this.f.email.value,"password":this.f.password.value}
        }
      this.log.login(payload).subscribe(loginData => {
        if (loginData.ProcessVariables.count === '1') {
          this.router.navigateByUrl('/dashboard');

          this.toastr.success('Logged in successfully', 'Success');
          localStorage.setItem('loginCheck', loginData.ProcessVariables.login_status);
          localStorage.setItem('email', this.f.email.value);
        } else {
          this.toastr.error('Invalid Email ID and Password', 'Error');
          localStorage.setItem('loginCheck', loginData.ProcessVariables.login_status);
          localStorage.setItem('email', this.f.email.value);
        }
      })      
    }
  }
  // tslint:disable-next-line: typedef
  get f() { return this.fg.controls; }
}
