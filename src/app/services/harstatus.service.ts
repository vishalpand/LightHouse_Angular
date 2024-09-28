import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HarstatusService {
  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  getharStatusData(appName: string) {
    let httpParams = new HttpParams()
    .append("applicationName",appName);

    return this.http.post(`${this.baseUrl}/api/getPageWiseHarDetails`, {}, {params: httpParams});
  }




  updateHarData(ID:any,harflag:any,pageName:any) {

    let integerValue: number = Number(ID);
    let httpParams = new HttpParams()
    .append("id",integerValue)
    .append("harflag",harflag);
    
    return this.http.post(`${this.baseUrl}/api/updateHarStatus`, {}, {params: httpParams});

  }
}
