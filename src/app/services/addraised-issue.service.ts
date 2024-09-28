import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddraisedIssueService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  getOnEscalationAddedIssues() {
   
    let userid= String(localStorage.getItem('user_id'));
    let httpParams = new HttpParams()
    .append("userId",userid);
    return this.http.post(`${this.baseUrl}/api/getOnEscalationAddedIssues`, {}, {params: httpParams});

  }




  ckeckifEscalationsExits(applicationName:any,pageName:any) {

    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("pageName",pageName);
    return this.http.post(`${this.baseUrl}/api/checkIfEscalationExists`, {}, {params: httpParams});
  }



  getCCdetails() {
    return this.http.get(`${this.baseUrl}/api/getCCdetails`);
  }



  saveEmailData(formData:FormData){

   return this.http.post(`${this.baseUrl}/api/sendEmailForEscalate`, formData);
  }


}
