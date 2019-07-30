import { BaseService } from './service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService extends BaseService {
  constructor(private service: HttpClient) {
    super(service);
  }
}
