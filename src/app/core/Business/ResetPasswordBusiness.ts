import { ResetPasswordService } from './../services/ResetPasswordService';
import { ForgotPasswordModel } from './../model/ForgotPasswordModel';
import { RegisterService } from '../services/registerService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPasswordModel } from '../model/ResetPasswordModel';
@Injectable()
export class ResetPasswordBusiness {
  constructor(private service: ResetPasswordService) { }

  ResetPassword(Data: ResetPasswordModel): Observable<ResetPasswordModel> {
    return this.service.post<any>('Customer/ResetPassword', (Data));
  }

  FotgotPassword(Data: ForgotPasswordModel): Observable<ForgotPasswordModel> {
    return this.service.post<any>('Customer/FotgotPassword', (Data));
  }
}
