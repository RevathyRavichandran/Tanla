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

  getDashboardPercentage(payload): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/dashboard count API`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, payload, options).pipe(
      map((data) => {
        return data;
      }),
      catchError(() => throwError('Percentage not found!'))
    );
  }

  getChartData(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/surveyNameCount_dashboard`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }

  getQuestionData(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/questionViceFilter`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }
  getQuestion(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/questionFilterDashboard`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }
  dashCal(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/calculationDashboadAPi`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }
  listdashboard(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/Advanced_Filter`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }
  questionCal(processVar): Observable<any> {
    let url = `https://compute.twixor.digital/d/app/nps_twixor_survey/api/questionCalculation`;
    let headers = new HttpHeaders({
      'authentication-token':
        'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl',
    });
    let options = { headers: headers };

    return this.http.post<any>(url, processVar, options).pipe(
      map((data) => {
        return data.ProcessVariables;
      }),
      catchError(() => throwError('Filtered data not found!'))
    );
  }
}
