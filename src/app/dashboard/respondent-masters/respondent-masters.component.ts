import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResMastersService } from '../../../app/services/res-masters.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  fileSize = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'designation',
    'emailId',
    'phoneNo',
    'company',
    'department',
    'surveyName',
  ];

  dataSource = new MatTableDataSource([]);

  constructor(
    public resMastersService: ResMastersService,
    private snackBar: MatSnackBar
  ) {}

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
      this.dataSource = new MatTableDataSource(result['employeeList']);
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
    let payload = { ProcessVariables: { currentPage: event } };
    this.commonMethod(payload);
  }

  ngOnInit(): void {
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }

  downloadTemplate() {
    let content =
      'Employee Name,Designation,Email ID,Phone Number,Company,Department,,\n';
    content +=
      'Sample name,Developer,sample@gmail.com,89844xxxxx,Inswit,IT,Aug-2021,,';
    const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
    saveAs(file, 'template');
  }

  fileUpload() {
    console.log(localStorage.getItem('survey'))
    document.getElementById('file').click();
  }

  submit() {
    this.isLoad = true;
    let payload = {
      ProcessVariables: {
        surveyName: localStorage.getItem('survey'),
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
}
