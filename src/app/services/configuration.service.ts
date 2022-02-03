import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private dbUrl = 'https://compute.twixor.digital/d/project/';

  updateConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/Configuration_API',
      config
    );
  }

  listConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'NPS Feedback/api/Configuration_API',
      config
    );
  }

  constructor(private http: HttpClient) {}
}
