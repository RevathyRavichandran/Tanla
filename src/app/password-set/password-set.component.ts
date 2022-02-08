import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.css']
})
export class PasswordSetComponent implements OnInit {

  fg: FormGroup;

  constructor(public router: Router) {}

  ngOnInit(): void {
    const regex = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
    this.fg = new FormGroup({
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
    this.router.navigateByUrl('/passwordChanged');
  }

}
