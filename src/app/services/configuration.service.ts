import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private dbUrl = 'https://appiyo.karix.solutions/appiyo/d/app/';

  updateConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/updateConfiguration',
      config
    );
  }

  listConfig(config: any): Observable<any> {
    return this.http.post<any>(
      this.dbUrl + 'aupoc/api/Configuration_API',
      config
    );
  }

  constructor(private http: HttpClient) {}
}
