import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoginForm } from '../model/LoginForm';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    // });

    // return this.http.post<any>(`${this.baseUrl}/api/login`, JSON.stringify(loginForm)

    return this.http.post<any>(`${this.baseUrl}/api/login`, loginForm);
  }
}
