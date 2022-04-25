import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../signup/signup-request-payload";
import {map, Observable, pipe, tap, throwError} from "rxjs";
import {LoginRequestPayload} from "../login/login.request.payload";
import {LoginResponse} from "../login/login-response.payload";
import {LocalStorageService} from "ngx-webstorage";

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
              private localstorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload) : Observable<any> {
    return this.httpClient.post('http://localhost:8090/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload) : Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8090/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localstorage.store('authenticationToken', data.authenticationToken),
        this.localstorage.store('rollNo', data.rollNo),
        this.localstorage.store('refreshToken', data.refreshToken),
        this.localstorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.rollNo.emit(data.rollNo);

        return true;
      }));
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localstorage.clear('authenticationToken');
        this.localstorage.clear('expiresAt');

        this.localstorage.store('authenticationToken',
          response.authenticationToken);
        this.localstorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localstorage.retrieve('authenticationToken');
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localstorage.clear('authenticationToken');
    this.localstorage.clear('username');
    this.localstorage.clear('refreshToken');
    this.localstorage.clear('expiresAt');
  }

  getRollNo() {
    return this.localstorage.retrieve('rollNo');
  }
  getRefreshToken() {
    return this.localstorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }



}
