import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient,HttpHeaders,HttpParams,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  public baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getAllDashboardData(appName: string, startDate: string, endDate: string) {
    // const params = new HttpParams()
    //  .set('appName', applicationName)
    //  .set('startDate', startDate)
    //  .set('startTime', startTime)
    //  .set('endDate', endDate)
    //  .set('endTime', endTime);
    let httpParams = new HttpParams()
    .append("appName",appName)
    .append("startDate", startDate)
    .append("endDate", endDate);
    


    return this.http.post(`${this.baseUrl}/api/dashboard`, {}, {params: httpParams});


    // return this.http.post<any>(`${this.baseUrl}/api/projectholeview`,{}, {
    //   params: httpParams,
    // });

  }

  getApplicationlist(user_id:any){
    
    let httpParams = new HttpParams()
    .append("user",user_id);
    return this.http.post(`${this.baseUrl}/api/getAllApps`, {}, {params: httpParams});

  }



  getErrorList(appName:any,startDate:any,endDate:any){
    let httpParams = new HttpParams()
    .append("appName",appName)
    .append("startDate", startDate)
    .append("endDate", endDate);

    return this.http.post(`${this.baseUrl}/api/getErrorDetails`, {}, {params: httpParams});
  }



  getWaterfalldetailsbyid(id:any){
    return this.http.post(`${this.baseUrl}/api/getWaterfall?executionId=${id}`, {});

  }


  isharExist(executionid:any){
    let httpParams = new HttpParams()
    .append("executionId",executionid);
    return this.http.post(`${this.baseUrl}/api/isHarExists`, {},{params: httpParams});
  }

}
