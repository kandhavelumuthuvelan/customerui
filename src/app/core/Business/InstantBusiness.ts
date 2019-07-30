import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstantService } from '../services/InstantService';
import { InstantModel } from '../model/InstantModel';
@Injectable()
export class InstantBusiness {

  constructor(private service: InstantService) { }

  InsertInstantQuote(instant: InstantModel): Observable<InstantModel> {
    return this.service.post<any>('Instant/InsertInstantQuote', (instant));
  }

  GetProductCategories(): Observable<any> {
    return this.service.get<any>(`Product/InstantProductCategories`);
  }

  GetProductDisciplines(categoryId: string): Observable<any> {
    return this.service.get<any>(`Product/ProductDisciplines/${categoryId}`);
  }

  GetProductSectors(deciplineId: string): Observable<any> {
    return this.service.get<any>(`Product/ProductSectors/${deciplineId}`);
  }

}
