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
        "authentication-token": 'irl6L9edYpPp1FuBOSid72sE+v53DJtSFdstm7S/BQEfXZJCEMLuKFgxM9RtZPcl'
      })
    });
    return next.handle(req);
  }
}