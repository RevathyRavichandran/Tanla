import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  fg: FormGroup;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      password: new FormControl(null, Validators.required),
      passwordNew: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required)
    })
  }

  submit() {
    this.router.navigateByUrl('/login')
  }


}
