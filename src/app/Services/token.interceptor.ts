import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inject: Injector, private route: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthentificationService);
    let authRequest = request;
    authRequest = this.AddTokenHeader(request, authService.getAccesssToken());
    return next.handle(authRequest).pipe(
      catchError((error) => {
        console.log(error.status);
        if (error.status === 401) {
          // this.handleRefreshToken(request, next);
          alert('Session Expired !!  Login again');
          localStorage.clear();
          this.route.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
  AddTokenHeader(request: HttpRequest<any>, access_Token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + access_Token),
    });
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    let authService = this.inject.get(AuthentificationService);

    /***** Ce bout de code n'execute pas  STARTS HERE*/
    authService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        authService.saveTokens(data);
        return next.handle(this.AddTokenHeader(request, data.access_Token));
      }),
      catchError((erroData) => {
        authService.logout();
        return throwError(erroData);
      })
    );
    /***** Ce bout de code n'execute pas END HERE */
  }
}
