import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css']
})
export class AdminPopupComponent implements OnInit {

  fg: FormGroup;

  constructor(public dialogRef: MatDialogRef<AdminPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fg = new FormGroup(
      {
        "username": new FormControl(this.data?.username || null, Validators.required),
        "emailId": new FormControl(this.data?.emailId || null, Validators.required),
        "password": new FormControl(this.data?.password || null, Validators.required),
        "role": new FormControl(this.data?.role || "user", Validators.required)
      }
    )
  }

  saveUser() {
    console.log(this.fg.value);
    this.dialogRef.close();
  }

  cancelUser() {
    this.dialogRef.close();
  }
}
