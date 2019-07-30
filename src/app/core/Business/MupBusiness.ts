
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MupService } from '../services/MupService';
import { MupModel } from '../model/MupModel';
@Injectable()
export class MupBusiness {
  constructor(private service: MupService) {}

  GetMupRequestCustomer(): Observable<MupModel[]> {
    return this.service.get('MutualProduct/GetMupRequestCustomer');
  }

  DeleteMupRequest(id: string): Observable<any> {
    return this.service.post<any>(`MutualProduct/DeleteMupRequest/${id}`);
  }

  MoveToCart(id: string): Observable<string> {
    return this.service.post<string>(`Cart/InsertCartMup/${id}`);
  }

}
