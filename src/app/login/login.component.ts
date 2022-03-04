import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
        if (loginData.ProcessVariables.failCount > 3) {
          Swal.fire({
            title: 'Warning',
            text: 'You have exceeded the maximum number of login attempts. Please reset your password.',
            icon: 'warning',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reset',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/forgotPassword')
            } else {
              
            }
          })
        } else {
          if (loginData.ProcessVariables.count === '1') {
          this.router.navigateByUrl('/dashboard');

          this.toastr.success('Logged in successfully', 'Success');
          localStorage.setItem('loginCheck', loginData.ProcessVariables.login_status);
          localStorage.setItem('email', this.f.email.value);
          localStorage.setItem('status', loginData.ProcessVariables.employeeRole);
        } else {
          this.toastr.error('Invalid Email ID and Password', 'Error');
          localStorage.setItem('loginCheck', loginData.ProcessVariables.login_status);
          localStorage.setItem('email', this.f.email.value);
        }
        }
        
      })      
    }
  }
  // tslint:disable-next-line: typedef
  get f() { return this.fg.controls; }
}
