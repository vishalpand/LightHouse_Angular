import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SuperDashbordService {

  public baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getavgAvailability(applicationName:any, startDate:any, endDate:any){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("startDate",startDate)
    .append("endDate",endDate);
  
    return this.http.post(`${this.baseUrl}/api/getAvgAvailability`, {}, {params: httpParams});
  }



  getSlowPageData(applicationName:any, startDate:any, endDate:any){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("startDate",startDate)
    .append("endDate",endDate);
  
    return this.http.post(`${this.baseUrl}/api/getSlowPageData`, {}, {params: httpParams});
  }

}
