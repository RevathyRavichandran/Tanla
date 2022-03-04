import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../app/services/survey.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-survey-popup',
  templateUrl: './survey-popup.component.html',
  styleUrls: ['./survey-popup.component.css'],
})
export class SurveyPopupComponent implements OnInit {
  role: boolean = true;
  fg: FormGroup;
  fileName = null;
  fileContent = '';
  fileSize = 0;
  serviceType: any = [];
  selectedService: string[];

  get categoryArr() {
    return this.fg.get('category') as FormArray;
  }

  addcategory() {
    this.categoryArr.push(
      new FormGroup({
        category: new FormControl('', Validators.required),
      })
    );
  }

  removecategory(i) {
    this.categoryArr.removeAt(i);
  }
  constructor(
    public dialogRef: MatDialogRef<SurveyPopupComponent>,
    public surveyService: SurveyService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    let payload = {
      "ProcessVariables": {}
      }      
    this.surveyService.selectSurveytype(payload).subscribe(res=> {
      this.serviceType = res.ProcessVariables.serviceType;
    })
    let category = [];
    let ansInit = [{ category: '' }];
    ansInit.forEach((element) => {
      category.push(
        new FormGroup({
          category: new FormControl(element.category, Validators.required),
        })
      );
    });
    this.fg = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormArray(category),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required)
    });
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
    if (this.fileContent !== '' && this.fileContent !== null) {
      this.surveyService.uploadFile(body).subscribe((res) => {
        let surveyName = this.selectedService + '-' + this.fg.value.name;
        let catArr = [];
        this.fg.value.category.forEach((element) => {
          catArr.push(element.category);
        });
        let category = catArr.toString();
        var payload = {
          ProcessVariables: { catagoryName: category, surveyName: surveyName },
        };
        this.surveyService.createSurvey(payload).subscribe((res) => {
          this.dialogRef.close(true);
        });
      });
    } else {
      let endDate = moment(this.fg.value.end).format('YYYY/MM/DD');
      let startDate = moment(this.fg.value.start).format('YYYY/MM/DD');
      let surveyName = this.selectedService + '-' + this.fg.value.name;
      let catArr = [];
      this.fg.value.category.forEach((element) => {
        catArr.push(element.category);
      });
      let category = catArr.toString();
      var payload = {
        ProcessVariables: { catagoryName: category, surveyName: surveyName, fromDate: startDate, toDate: endDate },
      };
      this.surveyService.createSurvey(payload).subscribe((res) => {
        if (!res.ProcessVariables.isTrue) {
          this.toastr.error('Survey name should be unique', 'Error');
        } else {
          this.toastr.success('Survey created successfully', 'Success');
          this.dialogRef.close(true);
        }        
      });
    }
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
  downloadQuestion(name) {
    let payload = {
      ProcessVariables: { surveyName: name },
    };
    this.surveyService.downloadQues(payload).subscribe((res) => {
      let content = res.ProcessVariables.attachment.content;
      content = atob(content);
      const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
      saveAs(file, name);
      this.toastr.success('Question downloaded successfully', 'Success');
    });
  }
}
