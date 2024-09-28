import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class SkippedIssueService {

  public baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getIssuesOnEscalationByStatus(applicationName:any, startDate:any, endDate:any,status:any){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("startDate",startDate)
    .append("endDate",endDate)
    .append("status",status);
   
    return this.http.post(`${this.baseUrl}/api/getIssuesOnEscalationByStatus`, {}, {params: httpParams});
  }

 
  
}