import { HttpClient } from '@angular/common/http';
import { BaseService } from './baseService';
import { Injectable } from '@angular/core';

@Injectable()
export class ResetPasswordService extends BaseService {
  constructor(private serivce: HttpClient) {
    super(serivce);
  }
}
