import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  fg: FormGroup;
  categories = [];

  submitQuestion() {
    this.dialogRef.close(this.fg.value);
  }

  cancelQuestion() {
    this.dialogRef.close();
  }

  get answerArr() {
    return this.fg.get('answers') as FormArray;
  }

  addAnswer() {
    this.answerArr.push(
      new FormGroup(
        {
          id: new FormControl(null),
          answer: new FormControl("", Validators.required)
        }
      )
    )
  }

  removeAnswer(i) {
    this.answerArr.removeAt(i);
  }

  constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.surveyName)
    this.categories = this.data.categories;
    let answers = [];
    this.data.answers.forEach(element => {
      answers.push(
        new FormGroup(
          {
            id: new FormControl(element.id),
            answer: new FormControl(element.answer, Validators.required)
          }
        )
      )
    });
    this.fg = new FormGroup(
      {
        "category": new FormControl({ value: this.data.category, disabled: this.data.editMode }, Validators.required),
        "question": new FormControl(this.data.question, Validators.required),
        "answers": new FormArray(answers),
        "survey": new FormControl(this.data.surveyName),
      }
    )
  }
}
