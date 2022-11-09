import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private UrlUsers: string = 'http://localhost:6039/user/getAllUsers';

  constructor(private httpUser: HttpClient) {}
  getAllUsers(): Observable<User[]> {
    return this.httpUser.get<User[]>(this.UrlUsers);
  }
}
