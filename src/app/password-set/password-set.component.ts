import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.css']
})
export class PasswordSetComponent implements OnInit {

  fg: FormGroup;

  constructor(public router: Router, public login: LoginService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
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
      "ProcessVariables": {"emailId":this.f.email.value,"password":this.f.passwordNew.value, "curnt_pass":this.f.password.value}
      }
    this.login.resetPwd(payload).subscribe(reset => {
      console.log(reset.ProcessVariables.error_code == '1')
      if (reset.ProcessVariables.error_code == '1') {
        this.router.navigateByUrl('/passwordChanged');
      } else if (reset.ProcessVariables.error_code == '2'){
        this.toastr.error('Invalid current password');
      } else if (reset.ProcessVariables.error_code == '0'){
        this.toastr.error('Current password must not be old password');
      }      
    })
  }

}
