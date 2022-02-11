import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class dashboardService {
  constructor(private http: HttpClient) {}

  public weekBtn: Subject<any> = new Subject<any>();
  public monthBtn: Subject<any> = new Subject<any>();
  weekBtnObs(): Observable<any> {
    return this.weekBtn.asObservable();
  }
  monthBtnObs(): Observable<any> {
    return this.monthBtn.asObservable();
  }

  getDashboardPercentage(): Observable<any> {
    let url = `https://appiyo.karix.solutions/appiyo/d/project/NPS Feedback/api/Dashboard count API`;
    let processVariables = {
      processVariables: {
        processId: '43bcca90720311ec843fcaa870889860',
        ProcessVariables: {},
        projectId: '61c9875a703ed2144f9706b4',
        logSessionId: 'nlwpvo4btfoutazvhpx0cgy666h3f3zbnpvz',
      },
    };
    let headers = new HttpHeaders({
      'authentication-token':
        'ApTpbPTQ+S4nTNYHHBzmesprv7se9zQWF8DYnyxoFVwfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVariables, options).pipe(
      map((data) => {
        return data;
      }),
      catchError(() => throwError('Percentage not found!'))
    );
  }

  getChartData(axisValue): Observable<any> {
    let url = `https://appiyo.karix.solutions/appiyo/d/project/NPS Feedback/api/Dashboard Chart API`;
    let processVariables = {
      processVariables: {
        xAxis: axisValue
      }
    };
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVariables, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Chart data not found!'))
    );
  }
}
