import { Injectable } from '@angular/core';
import { BaseService } from '../services/service';
import { Observable } from 'rxjs';
import { InvoiceDetail } from '../model/InvoiceModel';

@Injectable()
export class InvoiceBussiness {
  constructor(private service: BaseService) {}

  GetInvoiceDetailById(id: string): Observable<InvoiceDetail[]> {
    return this.service.get<InvoiceDetail[]>(`invoice/GetInvoiceDetails/${id}`);
  }
}
