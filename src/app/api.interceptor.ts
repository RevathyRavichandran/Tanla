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
        "authentication-token": 'H2LwjJnF1TydQkhaynR2xXxmcpuVGDoUj1svOQEuBn0fXZJCEMLuKFgxM9RtZPcl'
      })
    });
    return next.handle(req);
  }
}