import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../app/services/survey.service';

@Component({
  selector: 'app-survey-popup',
  templateUrl: './survey-popup.component.html',
  styleUrls: ['./survey-popup.component.css']
})
export class SurveyPopupComponent implements OnInit {
  fg: FormGroup;
  fileName = null;
  fileContent = '';
  fileSize = 0;

  get categoryArr() {
    return this.fg.get('category') as FormArray;
  }

  addcategory() {
    this.categoryArr.push(
      new FormGroup(
        {
          category: new FormControl("", Validators.required)
        }
      )
    )
  }

  removecategory(i) {
    this.categoryArr.removeAt(i);
  }
  constructor(public dialogRef: MatDialogRef<SurveyPopupComponent>, public surveyService: SurveyService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let category = [];
    let ansInit = [
      {category: ''}
    ]
    ansInit.forEach(element => {
      category.push(
        new FormGroup(
          {
            category: new FormControl(element.category, Validators.required)
          }
        )
      )
    });
    this.fg = new FormGroup(
      {
        "name": new FormControl(null, Validators.required),
        "category": new FormArray(category)
      }
    )
  }

  saveSurvey() {
    let body = {
      ProcessVariables: {
        attachment: {
          content: btoa(this.fileContent),
          name: this.fileName,
          operation: 'upload',
          mime: 'application/vnd.ms-excel',
          size: this.fileSize,
        },
      },
    };
    this.surveyService.uploadFile(body).subscribe(
      res => {
        let surveyName = this.fg.value.name;
        let catArr = []
        this.fg.value.category.forEach(element => {
          catArr.push(element.category)
        });
        let category = catArr.toString();
        var payload = {
          "ProcessVariables": {"catagoryName":category,"surveyName":surveyName}
        }
        this.surveyService.createSurvey(payload).subscribe((res) => {
          this.dialogRef.close(true);
        })
      }
    )
  }

  cancelSurvey() {
    this.dialogRef.close();
  }

  fileUpload() {
    document.getElementById('file').click();
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.fileName = file.name;
      this.fileSize = file.size;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.fileContent = csv;
      };
    }
  }
}
