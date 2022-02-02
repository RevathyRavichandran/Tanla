import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SurveyPopupComponent } from '../survey-popup/survey-popup.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyComponent implements OnInit {
  @ViewChildren('radio') radio: QueryList<any>;
  page = 1;
  pageSize = 10;
  userList: any[] = [
    {
      sno: 1,
      survey: 'Survey1',
      category: 'SMS, email',
      date: '19 Aug 2021',
      isLive: true,
    },
    {
      sno: 2,
      survey: 'Survey2',
      category: 'SMS, email',
      date: '19 Aug 2021',
      isLive: false,
    },
    {
      sno: 3,
      survey: 'Survey3',
      category: 'SMS, email',
      date: '19 Aug 2021',
      isLive: false,
    },
    {
      sno: 4,
      survey: 'Survey4',
      category: 'SMS, email',
      date: '19 Aug 2021',
      isLive: false,
    },
    {
      sno: 5,
      survey: 'Survey5',
      category: 'SMS, email',
      date: '19 Aug 2021',
      isLive: false,
    },
  ];

  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) {
    localStorage.setItem('survey', this.userList[0]['survey']);
  }

  ngOnInit(): void {}

  createSurvey() {
    const dialogRef = this.dialog.open(SurveyPopupComponent, {
      width: '1000px',
    });
  }

  liveCheck(event) {
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
        console.log(event);
        Swal.fire(
          'Moved!',
          'Your survey has been moved to live successfully.',
          'success'
        );
        this.radio['_results'].forEach((element, index) => {
          if (element.nativeElement.childNodes[0].childNodes[0].checked) {
            this.userList.forEach((val, ind) => {
              val.isLive = ind === index;
              localStorage.setItem('survey', this.userList[ind]['survey']);
            })
          }
        })
      } else {
        this.userList.forEach((val, index) => {
          if (val.isLive) {
            this.radio['_results'][index].nativeElement.childNodes[0].childNodes[0].checked = true;
            localStorage.setItem('survey', this.userList[index]['survey']);
          }
        })
      }
    });
  }
}
