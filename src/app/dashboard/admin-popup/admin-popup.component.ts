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
  reason: boolean = false;

  constructor(public dialogRef: MatDialogRef<AdminPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fg = new FormGroup(
      {
        "username": new FormControl(this.data?.username || null, Validators.required),
        "Employee": new FormControl(this.data?.employeeNo || null, Validators.required),
        "mobile": new FormControl(this.data?.phone || null, Validators.required),
        "status": new FormControl(this.data?.ActiveDeActive || null, Validators.required),
        "reason": new FormControl(this.data?.username || null, Validators.required),
        "emailId": new FormControl(this.data?.emailId || null, Validators.required),
        "Department": new FormControl(this.data?.dept || null, Validators.required),
        "Designation": new FormControl(this.data?.designation || null, Validators.required)
      }
    )
  }

  showReason(event) {
    this.reason = event.target.value === '1' ? false : true;
    console.log(this.reason)
  }
  saveUser() {
    console.log(this.fg.value);
    this.dialogRef.close();
  }

  cancelUser() {
    this.dialogRef.close();
  }
}
