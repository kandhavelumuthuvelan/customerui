import { RegisterService } from '../services/registerService';
import { RegisterModel } from '../model/RegisterModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class RegisterBusiness {
  constructor(private service: RegisterService) { }

  InsertCustomerProfile(registerInfo: RegisterModel): Observable<RegisterModel> {
    return this.service.post<any>('Customer/InsertCustomerProfile', (registerInfo));
  }
}
