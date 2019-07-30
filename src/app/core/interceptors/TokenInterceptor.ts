import { LoginBusiness } from './../Business/LoginBusiness';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, switchMap, tap, finalize } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import {environment} from '../../../environments/environment.dev';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private authService: LoginBusiness,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    | any
  > {
    return next.handle(this.addTokenToRequest(request)).pipe(
      catchError(err => {
        setTimeout(
          function() {
            this.spinnerService.hide();
          }.bind(this),
          1
        );
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(request, next);
              case 400:
              return throwError(err);
              case 403: {
                this.authService.logout();
            }
          }
        } else {
          return throwError(err);
        }
      }),
      finalize(() => {
        setTimeout(
          function() {
            this.spinnerService.hide();
          }.bind(this),
          1
        );
      })
    );
  }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        })
      );
    }
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    this.spinnerService.show();
    return request.clone({
      setHeaders: { Authorization: `Bearer ${localStorage.getItem(`${environment.localStorageName}token`)}` }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.refreshToken().pipe(
      switchMap(() => {
        request = this.addTokenToRequest(request);
        return next.handle(request);
      }),
      catchError(() => {
        return <any>this.authService.logout();
      })
    );
  }
}
