import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginForm } from '../model/LoginForm';
import { Observable } from 'rxjs';
import { userCreation } from '../model/userCreation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  Checkcurrentpass(loginForm: LoginForm): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    // });

    // return this.http.post<any>(`${this.baseUrl}/api/login`, JSON.stringify(loginForm)

    return this.http.post<any>(`${this.baseUrl}/api/checkPassword`, loginForm);
  }




  upDatepassword(loginForm: LoginForm): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/changePassword`, loginForm);
  }


  cretUser(createUser: userCreation, applist: any): Observable<any> {
    let httpParams = new HttpParams()
      .append("user_name", createUser.userName)
      .append("user_id", createUser.userId)
      .append("empRole", createUser.role)
      .append("appList", applist)
      .append("password", createUser.passWord)
      .append("clientname", createUser.clientname)
      .append("emailid", createUser.emailid);
    return this.http.post(`${this.baseUrl}/api/createUser`, {}, { params: httpParams });
  }



  updateUser(createUser: userCreation, applist: any): Observable<any> {
    let httpParams = new HttpParams()
      .append("user_name", createUser.userName)
      .append("user_id", createUser.userId)
      .append("empRole", createUser.role)
      .append("appList", applist)
      .append("emailid", createUser.emailid);
    return this.http.post(`${this.baseUrl}/api/updateUser`, {}, { params: httpParams });
  }


  getApplicationlist(){
    return this.http.get(`${this.baseUrl}/api/getApplicationList`);

  }



  showUser(roleid:any){
    let httpParams = new HttpParams()
    .append("roleId",roleid);
    return this.http.post(`${this.baseUrl}/api/showUser`, {}, {params: httpParams});

  }


  userlistPerUser(userid:any){
    let httpParams = new HttpParams()
    .append("userId",userid);
    return this.http.post(`${this.baseUrl}/api/getApplicationPerUser`, {}, {params: httpParams});

  }

  deleteUser(userid:any){
    let httpParams = new HttpParams()
    .append("userId",userid);
    return this.http.post(`${this.baseUrl}/api/deleteUser`, {}, {params: httpParams});
  }


  getAllUsers(){
    return this.http.get(`${this.baseUrl}/api/getAllUsers`);
  }

}
