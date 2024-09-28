import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppOnbor } from '../model/AppOnbordFormdata';

@Injectable({
  providedIn: 'root'
})
export class ApponBordService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  getimportapplicationData(formData: FormData) {
    return this.http.post(`${this.baseUrl}/api/importApplication`, formData);
  }


  getClientList(){
    return this.http.get(`${this.baseUrl}/api/getClientList`);
  }



  getDomainByClient(clientName: string) {
    let httpParams = new HttpParams()
    .append("clientName",clientName);
    return this.http.post(`${this.baseUrl}/api/getDomainByClient`, {}, {params: httpParams});

  }

}
