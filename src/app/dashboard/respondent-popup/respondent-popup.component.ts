import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { ResMastersService } from '../../../app/services/res-masters.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-respondent-popup',
  templateUrl: './respondent-popup.component.html',
  styleUrls: ['./respondent-popup.component.css']
})
export class RespondentPopupComponent implements OnInit {

  fileName = null;
  fileContent = '';
  fileSize = 0;
  selectedSurvey: string[];
  surveyNameList: any = [];
  isLoad = false;
  file = false;

  constructor(public dialogRef: MatDialogRef<RespondentPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public resMastersService: ResMastersService,
    private snackBar: MatSnackBar,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.surveyNameList = this.data.surveyNameList;
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

  public changeListener1(files: FileList) {
    console.log('test',files)
    if (files && files.length > 0) {
      this.file = true;
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
    } else {
      this.file = false;
    }
  }

  submit() {
    this.isLoad = true;
    let payload = {
      ProcessVariables: {
        surveyName: this.selectedSurvey,
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
          this.toastr.success('Respondents uploaded successfully', 'Success');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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

}
