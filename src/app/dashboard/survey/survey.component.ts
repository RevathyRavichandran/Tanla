import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SurveyPopupComponent } from '../survey-popup/survey-popup.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SurveyService } from '../../../app/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent implements OnInit {
  @ViewChildren('radio') radio: QueryList<any>;
  page = 1;
  pageSize = 10;
  isLoad = false;
  totalPages = 100;
  currentPage = 1;
  noRecords = false;
  fileName = null;
  fileContent = '';
  fileSize = 0;
  displayedColumns: string[] = [
    'id',
    'surveyType',
    'surveyName',
    'catagoryName',
    'surveyFromDate',
    'surveyToDate',
    'status',
    'live',
    'download',
    'downloadQues',
  ];
  isLive: boolean = false;

  dataSource = new MatTableDataSource([]);

  constructor(
    public dialog: MatDialog,
    public survey: SurveyService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    public toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    let payload = { ProcessVariables: { currentPage: 1 } };
    this.commonMethod(payload);
  }

  commonMethod(payload) {
    this.isLoad = true;
    this.survey.listSurvey(payload).subscribe((res) => {
      this.isLoad = false;
      let result = res['ProcessVariables'];
      this.totalPages = result['totalPages'];
      this.currentPage = result['currentPage'];
      this.pageSize = result['perPage'];
      this.noRecords = result['surveyList'] ? false : true;
      this.isLoad = false;
      result['surveyList'].forEach((element) => {
        element.surveyDate = moment(element.surveyDate).format('DD/MM/YYYY');
      });
      if (this.noRecords) {
        this.snackBar.open('There are no records found!!!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
          panelClass: ['error-snack-bar'],
        });
      }
      this.dataSource = new MatTableDataSource(result['surveyList']);
      this.cd.detectChanges();
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

  createSurvey() {
    const dialogRef = this.dialog.open(SurveyPopupComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let payload = { ProcessVariables: { currentPage: 1 } };
        this.commonMethod(payload);
      }
    });
  }

  downloadSurvey(name) {
    let payload = {
      ProcessVariables: { surveyName: name },
    };
    this.survey.downloadSurvey(payload).subscribe((res) => {

      let content = res.ProcessVariables.attachment.content;
      content = atob(content);
      const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
      saveAs(file, name);
      this.toastr.success('Survey downloaded successfully', 'Success');
    });
  }

  downloadQuestion(name) {
    let payload = {
      ProcessVariables: { surveyName: name },
    };
    this.survey.downloadQues(payload).subscribe((res) => {
      let content = res.ProcessVariables.attachment.content;
      content = atob(content);
      const file = new Blob([content], { type: 'text/csv;charset=UTF-8' });
      saveAs(file, name);
      this.toastr.success('Question downloaded successfully', 'Success');
    });
  }

  liveCheck(event, name, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to move this survey to live?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, move it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('survey', name);
        let payload = {
          ProcessVariables: { id: id },
        };
        this.survey.liveSurvey(payload).subscribe((res) => {
          Swal.fire(
            'Moved!',
            'Your survey has been moved to live successfully.',
            'success'
          );
          let payload = { ProcessVariables: { currentPage: 1 } };
          this.commonMethod(payload);
        });
        // this.radio['_results'].forEach((element, index) => {
        //   if (element.nativeElement.childNodes[0].childNodes[0].checked) {
        //   }
        // })
      } else {
        console.log('test cancel')
        let payload = { ProcessVariables: { currentPage: 1 } };
        this.commonMethod(payload);
        // this.userList.forEach((val, index) => {
        //   if (val.isLive) {
        //     this.radio['_results'][index].nativeElement.childNodes[0].childNodes[0].checked = true;
        //     localStorage.setItem('survey', this.userList[index]['survey']);
        //   }
        // })
      }
    });
  }
}
