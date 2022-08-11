import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private dbUrl = 'https://compute.twixor.digital/d/app/multisurvey_v0/api/';

  updateConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'updateConfiguration',
      config
    );
  }

  listConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'Configuration_API',
      config
    );
  }

  constructor(private http: HttpClient) {}
}
