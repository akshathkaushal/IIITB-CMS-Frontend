import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request-payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import {LoginRequestPayload} from "../login/login.request.payload";
import {LoginResponse} from "../login/login-response.payload";
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() rollNo: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    rollNo: this.getRollNo()
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }


  login(loginRequestPayload: LoginRequestPayload): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/token',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('email',data.email);
        this.localStorage.store('role',data.role);
        this.localStorage.store('rollNo', data.rollNo);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('token', data.token);
        console.log("name is ", data.name);
        this.localStorage.store('name',data.name);
        console.log(this.localStorage.retrieve('name'));
        this.loggedIn.emit(true);
        this.rollNo.emit(data.rollNo);
        return data;
    }));
  }

  getDropDown() : Observable<any>
  {
    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )

    return this.httpClient.get<any>(`http://localhost:8080/api/subpost`);
  }
  // login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
  //   return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
  //     loginRequestPayload).pipe(map(data => {
  //     this.localStorage.store('token', data.token);
  //     this.localStorage.store('rollNo', data.rollNo);
  //     this.localStorage.store('refreshToken', data.refreshToken);
  //     this.localStorage.store('expiresAt', data.expiresAt);

  //     this.loggedIn.emit(true);
  //     this.rollNo.emit(data.rollNo);
  //     return true;
  //   }));
  // }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('token');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('token',
          response.token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {

    let token = localStorage.getItem("token");
    let header = new HttpHeaders(
      {
        Authorization : "Bearer " + token
      }
   )
//     let appid = localStorage.getItem("appid");
     return this.httpClient.get<any>(`http://localhost:8080/api/auth/logout`,{headers:header,responseType:'json'} )

    // this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
    //   { responseType: 'text' })
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     throwError(error);
    //   })
    // this.localStorage.clear('token');
    // this.localStorage.clear('rollNo');
    // this.localStorage.clear('refreshToken');
    // this.localStorage.clear('expiresAt');
  }

  getRollNo() {
    return this.localStorage.retrieve('rollNo');
  }

  getRole() : Observable<any>
  {
    return this.localStorage.retrieve('role');
  }

  getName()
  {
    return this.localStorage.retrieve('name');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
