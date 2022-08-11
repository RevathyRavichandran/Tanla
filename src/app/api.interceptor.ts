import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: new HttpHeaders({
        "authentication-token": '9qW9AvyhAGNjB36MkSs491gJccTJcG7oh2Vfnxfj09kfXZJCEMLuKFgxM9RtZPcl'
      })
    });
    return next.handle(req);
  }
}