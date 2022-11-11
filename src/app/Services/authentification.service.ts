import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private URLCreateAccount: string = 'http://localhost:6039/user/saveUser';
  private URLAuthenticate: string = 'http://localhost:6039/api/login';
  private UrlGenerateRefreshToken = 'http://localhost:6039/user/token/refresh';
  private UrlCheckAccount = 'http://localhost:6039/user/isEnabled/';
  private URLSendResetPasswordEmail =
    'http://localhost:6039/email/sendEmailForgetPassword/';
  private URLChangePassword = 'http://localhost:6039/user/changeUserPassword';

  constructor(private httpUser: HttpClient, private route: Router) {}

  saveUser(user: User) {
    return this.httpUser
      .post(this.URLCreateAccount, user)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
  authenticate(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpUser.get(this.URLAuthenticate, {
      params: params,
      responseType: 'json',
    });
  }
  logout() {
    alert('SESSION EXPRIED');
    localStorage.clear();
    this.route.navigate(['/authenticate']);
  }
  getAccesssToken() {
    return localStorage.getItem('access_token');
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
    return localStorage.getItem('refresh_token');
  }
  checkEnabledAccount(username: string) {
    return this.httpUser.get(this.UrlCheckAccount + username);
  }
  sendResetPasswordEmail(username: string) {
    return this.httpUser.get(this.URLSendResetPasswordEmail + username);
  }
  changePassword(token: string, newPassword: string) {
    return this.httpUser.put(
      `${this.URLChangePassword}/${token}/${newPassword}`,
      null
    );
  }
}
