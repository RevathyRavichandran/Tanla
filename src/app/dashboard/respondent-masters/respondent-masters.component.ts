import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResMastersService } from '../../../app/services/res-masters.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyService } from '../../../app/services/survey.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RespondentPopupComponent } from '../respondent-popup/respondent-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-respondent-masters',
  templateUrl: './respondent-masters.component.html',
  styleUrls: ['./respondent-masters.component.css'],
})
export class RespondentMastersComponent implements OnInit {
  isLoad = false;
  totalPages = 100;
  currentPage = 1;
  pageSize = 10;
  noRecords = false;
  fileName = null;
  fileContent = '';
  name = '';
  liveSurvey='';
  fileSize = 0;
  surveyNameList: any = [];
  selectedSurvey: string[];
  displayedColumns: string[] = [
    'id',
    'name',
    'designation',
    'emailId',
    'phoneNo',
    'company',
    'department',
    'col-1',
    'col-2',
    'delete'
  ];
  role: boolean = true;

  dataSource = new MatTableDataSource([]);

  constructor(
    public resMastersService: ResMastersService,
    private snackBar: MatSnackBar,
    public survey: SurveyService,
    public toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('status') === 'creator' ? true : false;
    let payloadSur = { ProcessVariables: { perPage: 100000 } };
    this.survey.listSurvey(payloadSur).subscribe((res) => {
      let result = res['ProcessVariables'];
      result['surveyList'].forEach(element => {
        if(element.activeStatus == '1') {
          this.liveSurvey = element.surveyName;
        }
        this.surveyNameList.push(element.surveyName);
        
      });
      this.surveyNameList=[...this.surveyNameList];
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.dataSource = new MatTableDataSource(result['surveyList']);
    })
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }

  surveyApply(name) {
    this.name =  name;
    let payload = { ProcessVariables: { "selectedField": "1", "selectedValue": name } };
    this.commonMethod(payload);
  }

  commonMethod(payload) {
    this.isLoad = true;
    this.resMastersService.getAllRecord(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.totalPages = result['totalPages'] * 10;
      this.currentPage = result['currentPage'];
      this.pageSize = result['perPage'];
      this.noRecords = result['employeeList'] ? false : true;
      this.isLoad = false;
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(result['employeeList']);
      }, 200);      
    }),
      (err) => {
        this.isLoad = false;
        this.noRecords = false;
        this.snackBar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
        console.log(err);
      };
  }

  pageChanged(event) {
    if (this.name === null || this.name === '') {
      let payload = { ProcessVariables: { currentPage: event } };
      this.commonMethod(payload);
    } else {
      let payload = { ProcessVariables: { "currentPage": event, "selectedField": "1", "selectedValue": this.name } };
      this.commonMethod(payload);
    }    
  }

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.surveyNameList.filter(option => option.toLowerCase().includes(filterValue));
  }

  downloadTemplate() {
    let content =
      'Employee Name,Designation,Email ID,Phone Number,Company,Department,Industry,New column1,\n';
    content +=
      'Sample name,Developer,sample@gmail.com,89844xxxxx,Inswit,Frontend,IT,,';
    const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
    saveAs(file, 'template');
  }

  fileUpload() {
    document.getElementById('file').click();
  }

  submit() {
    this.isLoad = true;
    let payload = {
      ProcessVariables: {
        surveyName: this.liveSurvey,
        attachment: {
          content: btoa(this.fileContent),
          name: this.fileName,
          operation: 'upload',
          mime: 'application/vnd.ms-excel',
          size: this.fileSize,
        },
      },
    };
    this.resMastersService.uploadFile(payload).subscribe(
      (res) => {
        let val = { ProcessVariables: { currentPage: 1 } };
        if (res.Error === '0') {
          this.commonMethod(val);
        } else {
          this.isLoad = false;
          this.snackBar.open('There is a problem uploading the data!!!', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['error-snack-bar'],
          });
        }
      },
      (err) => {
        this.isLoad = false;
        this.snackBar.open(err, '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
    );
  }

  public changeListener(files: FileList) {
    console.log(files)
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.fileName = file.name;
      this.fileSize = file.size;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.fileContent = csv;
        let content = "";
        if (this.fileContent) {
          this.fileContent.split("\n").forEach((ele, ind) => {
            if (ind === 0) {
              let val = ele.split(",,")[0];
              content += val + ",surveyName,," + "\n";
            } else {
              let val = ele.split(",,")[0];
              content += val + "," + localStorage.getItem('survey') + ",,\n";
            }
          });
          this.fileContent = content;
        }
      };
    }
  }
  delete(phone, survey) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        
        let payload = {
          ProcessVariables: {
            "survey_name":survey,"phone_number":phone
          }
      }
      this.resMastersService.deleteRespondent(payload).subscribe(res => {
        if(res.ProcessVariables.errorCode == '1') {
          Swal.fire(
            'Survey approved successfully'
          );
          window.location.reload();
        } else {
          this.toastr.error(
            'Something went wrong',
            'Error'
          );
        }
      })
      }
    });
  }

  upload() {
    const dialogRef = this.dialog.open(RespondentPopupComponent, {
      width: '900px',
      height: '400px',
      data: {
        surveyNameList: this.surveyNameList
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

}
