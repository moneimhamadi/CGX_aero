import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SignUpRequest } from '../Models/signUpRequest';
import { LoginRequest } from '../Models/signInRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private URLCreateAccount: string = 'http://localhost:9090/user/signUp';
  private URLAuthenticate: string = 'http://localhost:9090/api/auth/signin';
  private UrlGenerateRefreshToken = 'http://localhost:6039/user/token/refresh';

  constructor(private httpUser: HttpClient, private route: Router) {}

  saveUser(SignUpRequest: SignUpRequest): Observable<Object> {
    return this.httpUser
      .post<SignUpRequest>(this.URLCreateAccount, SignUpRequest)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
  authenticate(loginRequest: LoginRequest) {
    return this.httpUser.post(this.URLAuthenticate, loginRequest);
  }
  logout() {
    alert('SESSION EXPRIED');
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  getAccesssToken() {
    return localStorage.getItem('accessToken');
  }
  generateRefreshToken() {
    let refresh_token = this.getRefreshToken();
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + refresh_token,
    });
    return this.httpUser.get(this.UrlGenerateRefreshToken, {
      headers: headers,
    });
  }
  saveTokens(tokensData: any) {
    localStorage.setItem('access_token', tokensData.access_Token);
    localStorage.setItem('refresh_token', tokensData.refresh_Token);
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}
