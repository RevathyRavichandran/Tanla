import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line: typedef
  login() {
    if (this.f.password.value === 'Inswit@123') {
      this.router.navigateByUrl('/resetPassword');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  // tslint:disable-next-line: typedef
  get f() { return this.fg.controls; }
}
