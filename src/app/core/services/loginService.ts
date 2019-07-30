import { BaseService } from './baseService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService extends BaseService {
  constructor(private service: HttpClient) {
    super(service);
  }
}
