import { UserDetail } from './../model/login';
import { ProfileInfoModel } from './../model/profileInfoModel';
import { ProfileAddressModel } from '../model/ProfileAddressModel';
import { profilePasswordModel } from './../model/profilePasswordModel';
import { ProfileService } from './../services/profileService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBusiness } from './LoginBusiness';

@Injectable()
export class ProfileBusiness {
  LoggedInUser: UserDetail;
  constructor(private service: ProfileService, private loggedUser: LoginBusiness) {
    this.LoggedInUser = loggedUser.getLoggedInUserDetail();
  }

  GetCustomerProfile(): Observable<ProfileInfoModel> {
    return this.service.get<ProfileInfoModel>('Customer/GetCustomerProfile');

  }

  UpdateCustomerProfile(profileInfo: ProfileInfoModel): Observable<ProfileInfoModel> {
    return this.service.post<any>('Customer/UpdateCustomerProfile', (profileInfo));
  }

  GetCustomerAddress(): Observable<ProfileAddressModel> {
    return this.service.get<ProfileAddressModel>('CustomerAddress/GetCustomerAddress');
  }

  UpdateCustomerAddress(profileAddress: ProfileAddressModel): Observable<ProfileAddressModel> {
    return this.service.post<any>('CustomerAddress/UpdateCustomerAddress', (profileAddress));
  }

  UpdateCustomerPassword(profilePassword: profilePasswordModel): Observable<profilePasswordModel> {
    return this.service.post<any>('Customer/UpdateCustomerPassword', (profilePassword));
  }


}
