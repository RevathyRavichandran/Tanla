import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;

  constructor(public router: Router, public log: LoginService, private matSnackbar: MatSnackBar) {}

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
          this.matSnackbar.open('Logged in successfully', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['success-snack-bar'],
          });
        } else {
          this.matSnackbar.open('Invalid Email ID and Password', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['error-snack-bar'],
          });
        }
      })      
    }
  }
  // tslint:disable-next-line: typedef
  get f() { return this.fg.controls; }
}
