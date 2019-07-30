import { AddToken, DeleteToken } from './../stateManager/action/action';
import { Token } from './../model/store';
import { LoginModel, OAuthToken, UserDetail, LeadModel } from './../model/login';
import { LoginService } from '../services/loginService';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import * as Rx from 'rxjs';

import {environment} from '../../../environments/environment.dev';
import { SharedService } from '../services/SharedService';

@Injectable()
export class LoginBusiness {
  constructor(private service: LoginService, private store: Store<Token>, private filter: SharedService) {}
  helper = new JwtHelperService();

  public getLoggedInUserID = new Rx.BehaviorSubject<string>(
    this.isLoggedIn() ? this.getLoggedInUserDetail().id : ''
  );

  CheckIfUserIsValid(login: LoginModel): Observable<OAuthToken> {
    return this.service
      .post<OAuthToken>('Login/ValidateLogin', login)
      .pipe<OAuthToken>(
        map(x => {
          const user: UserDetail = this.helper.decodeToken(x.token);
          localStorage.setItem(`${environment.localStorageName}user`, JSON.stringify(user));
          this.getLoggedInUserID.next(user.id);
          this.filter.EmitName(user);
          localStorage.setItem(`${environment.localStorageName}token`, x.token);
          this.store.dispatch(new AddToken({ key: x.token }));
          return x;
        })
      );
  }

  InsertInboundLead(data: LeadModel): Observable<any> {
    return this.service.post<any>('Inbound/InsertInboundLead', (data));
  }

  logout(): void {
    localStorage.removeItem(`${environment.localStorageName}user`);
    localStorage.removeItem(`${environment.localStorageName}token`);
    this.getLoggedInUserID.next('');
    this.store.dispatch(new DeleteToken());
  }

  getLoggedInUserDetail(): UserDetail {
    return JSON.parse(localStorage.getItem(`${environment.localStorageName}user`));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(`${environment.localStorageName}user`);
  }

  refreshToken() {
    const details: UserDetail = this.getLoggedInUserDetail();
    return this.service
      .get<OAuthToken>(`Login/RefreshToken/${details.refreshToken}`)
      .pipe<OAuthToken>(
        map(x => {
          localStorage.setItem(
            `${environment.localStorageName}user`,
            JSON.stringify(this.helper.decodeToken(x.token))
          );
          localStorage.setItem(`${environment.localStorageName}token`, x.token);
          this.store.dispatch(new AddToken({ key: x.token }));
          return x;
        })
      );
  }
}
