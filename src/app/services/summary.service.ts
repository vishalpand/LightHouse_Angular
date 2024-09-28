import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  getSummaryData(appName: string, startDate: string, endDate: string) {
   
    let httpParams = new HttpParams()
    .append("applicationName",appName)
    .append("startDate", startDate)
    .append("endDate", endDate);
  
    return this.http.post(`${this.baseUrl}/api/getSummaryReport`, {}, {params: httpParams});
  }
}
