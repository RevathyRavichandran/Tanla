import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  fg: FormGroup;

  constructor(public router: Router, public login: LoginService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, Validators.required),
      empId: new FormControl(null, Validators.required),
      passwordNew: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
       ]),
      passwordConfirm: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.fg.controls; }

  // tslint:disable-next-line: typedef
  submit() {
    let payload = {
      "ProcessVariables": {"emailId":this.f.email.value, "empId": this.f.empId.value, "password":this.f.passwordNew.value}
      }
    this.login.forgotPwd(payload).subscribe(forgot => {
      if (forgot.ProcessVariables.errorCode == '1') {
        this.toastr.error('Please check emp ID and email ID', 'Error');
      } else {
        this.router.navigateByUrl('/passwordChanged');
      }      
    })
  }
}
