import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurrentIsueeService {

  public baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }



  getApplicationlist(applicationName:any){
    
    let httpParams = new HttpParams()
    .append("applicationName",applicationName);
    return this.http.post(`${this.baseUrl}/api/getCurrentIssuesOnEscalation`, {}, {params: httpParams});

  }


  getscreenshot(screenshotid:any){
    let httpParams = new HttpParams()
    .append("screenshotId",screenshotid);
    return this.http.post(`${this.baseUrl}/api/getScreenShot`, {}, {params: httpParams});
  }



  getContactInfo(applicationName:any,pageName:any,level:any ){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("pageName",pageName)
    .append("level",level);
    return this.http.post(`${this.baseUrl}/api/getEmailInfo`, {}, {params: httpParams});
  }


  skipped(applicationName:any,pageName:any,dateTime:any ){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("pageName",pageName)
    .append("datetime",dateTime);
    return this.http.post(`${this.baseUrl}/api/skipp`, {}, {params: httpParams});
  }



  saveEmailbyUser(applicationName:any,pageName:any,currentDateTime:any,id:any,levels:any ,userid:any ){
    let httpParams = new HttpParams()
    .append("applicationName",applicationName)
    .append("pageName",pageName)
    .append("currentdateTime",currentDateTime)
    .append("id",id)
    .append("levels",levels)
    .append("userId",userid);
    
    return this.http.post(`${this.baseUrl}/api/saveEmaildata`, {}, {params: httpParams});
  }


  skipSelected(ids:any, dateTime:any){
    let httpParams = new HttpParams()
    .append("ids",ids)
    .append("datetime",dateTime);
   
    return this.http.post(`${this.baseUrl}/api/skipSelected`, {}, {params: httpParams});
  }


  getCCdetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getCCdetails`);
  }

  sendEmailForEscalate(formData:FormData){
    return this.http.post(`${this.baseUrl}/api/sendEmailForEscalate`,formData);
  }

}

