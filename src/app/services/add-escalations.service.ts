import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddEscalationsService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getPagesByApplication(appName: string){
    let httpParams = new HttpParams()
    .append("applicationName",appName)
    return this.http.post(`${this.baseUrl}/api/getPagesByApplication`, {}, {params: httpParams});
  }



  getaddescalationslevel(appname: string,level:any) {

    let httpParams = new HttpParams()
    .append("applicationName",appname)
    .append("level",level);
    return this.http.post(`${this.baseUrl}/api/getEscalationDetailsByNameAndLevel`, {}, {params: httpParams});

  }

  createEscalationLevel(appname: string,pages: any, fullName: string, email: any, level1: string, level2:string, level3:string, level4:string, level5:string,level6:string, level7:string) {

    let httpParams = new HttpParams()
    .append("applicationName",appname)
    .append("pageName",pages)
    .append("fullName",fullName)
    .append("email",email)
    .append("level1",level1)
    .append("level2",level2)
    .append("level3",level3)
    .append("level4",level4)
    .append("level5",level5)
    .append("level6",level6)
    .append("level7",level7);
    return this.http.post(`${this.baseUrl}/api/createEscalationLevelPageWise`, {}, {params: httpParams});

  }

  editInstanceName(oldName: string, newName: string){
    let httpParams = new HttpParams()
    .append("applicationName",oldName)
    .append("newApplicationName",newName);
    return this.http.post(`${this.baseUrl}/api/editInstanceName`, {}, {params: httpParams});
  }


  editEscalationDetails(id:any,appName:any,fullName:any,email:any,level:any){
    let httpParams = new HttpParams()
    .append("level",level)
    .append("fullName",fullName)
    .append("id",id)
    .append("email",email)    
    .append("appName",appName);
    return this.http.post(`${this.baseUrl}/api/editEscalationDetails`, {}, {params: httpParams});
  }

  deleteEscalationDetails(id:any){
    let httpParams = new HttpParams()
    .append("id",id);
    return this.http.post(`${this.baseUrl}/api/deleteEscalationDetails`, {}, {params: httpParams});

  }


  
}
