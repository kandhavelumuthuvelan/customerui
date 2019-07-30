import { HttpClient } from '@angular/common/http';
import { BaseService } from './baseService';
import { Injectable } from '@angular/core';

@Injectable()
export class WishlistService extends BaseService {
  constructor(private service: HttpClient) {
    super(service);
  }

}
