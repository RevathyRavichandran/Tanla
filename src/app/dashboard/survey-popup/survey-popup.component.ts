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
  minDate: any;
  fileSize = 0;
  serviceType: any = [];
  selectedService: string[];
  eventCategory: boolean = false;

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
    this.minDate = new Date();
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

  get f() { return this.fg.controls; }

  saveSurvey() {
    let surveyName = this.selectedService + '-' + this.fg.value.name;
    let surType = this.serviceType.indexOf(this.selectedService) + 1;
    let type = this.selectedService;
    let body = {
      ProcessVariables: {
        typeName: type,
        surveyName: surveyName,
        surveyType: surType,
        attachment: {
          content: btoa(this.fileContent),
          name: this.fileName,
          operation: 'upload',
          mime: 'application/vnd.ms-excel',
          size: this.fileSize
        },
      },
    };
    if (this.fileContent !== '' && this.fileContent !== null) {
      let endDate = moment(this.fg.value.end).format('YYYY/MM/DD');
        let startDate = moment(this.fg.value.start).format('YYYY/MM/DD');
        let surveyName = this.selectedService + '-' + this.fg.value.name;
        let surType = this.serviceType.indexOf(this.selectedService) + 1;
        var payload = {
          ProcessVariables: { surveyName: surveyName, fromDate: startDate, toDate: endDate, surveyTypeId: surType },
        };
        this.surveyService.createSurvey(payload).subscribe((res) => {
          this.surveyService.uploadFile(body).subscribe((res) => {
            if(res.ProcessVariables.error.code == "Failure") {
              this.toastr.error('There was some problem with questionnaire upload', 'Error');
            } else {              
                this.toastr.success('Survey and Questinnaire uploaded successfully', 'Success');              
            }
          });
        });  
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 2000);
    } else {
      let endDate = moment(this.fg.value.end).format('YYYY/MM/DD');
      let startDate = moment(this.fg.value.start).format('YYYY/MM/DD');
      let surveyName = this.selectedService + '-' + this.fg.value.name;
      let surType = this.serviceType.indexOf(this.selectedService) + 1;
      let catArr = [];
      this.fg.value.category.forEach((element) => {
        catArr.push(element.category);
      });
      let category = catArr.toString();
      var payload2 = {
        ProcessVariables: { catagoryName: category, surveyName: surveyName, fromDate: startDate, toDate: endDate, surveyTypeId: surType },
      };
      this.surveyService.createSurvey(payload2).subscribe((res) => {
        if (!res.ProcessVariables.isTrue) {
          this.toastr.error('Survey name should be unique', 'Error');
        } else {
          this.toastr.success('Survey created successfully', 'Success');
          this.dialogRef.close(true);
        }
      });
    }
  }

  onChangeEvent(event: any){
    if(event.target.value) {
      this.eventCategory = true;
    } else {
      this.eventCategory = false;
    }
  }
  cancelSurvey() {
    this.dialogRef.close();
  }

  fileUpload() {
    document.getElementById('file').click();
  }

  downloadTemplate() {
    let content =
      'Category Name,Questions,option,option,option,option,option,score,score,score,score,score,\n';
      content+='SMS,Which *features* of our *SMS product* do you love the most?,Very good,Good,Average,Bad,Very bad,10,8,5,3,1';
    const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
    saveAs(file, 'Question template'); 
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
