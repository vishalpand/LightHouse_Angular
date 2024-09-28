import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SheduledowntimeService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  getApplicationtype(appName: string) {
   
    let httpParams = new HttpParams()
    .append("applicationName",appName);
  

    return this.http.post(`${this.baseUrl}/api/getApplicationTypes`, {}, {params: httpParams});

  }

  getInstanceNametype(appName: any,applicationType:any) {
   
    let httpParams = new HttpParams()
    .append("applicationName",appName)
    .append("applicationType",applicationType);
  

    return this.http.post(`${this.baseUrl}/api/getInstanceNamesByNameAndType`, {}, {params: httpParams});

  }
}
