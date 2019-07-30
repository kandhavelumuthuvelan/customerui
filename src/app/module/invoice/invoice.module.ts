import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { BaseService } from 'src/app/core/services/service';
import { InvoiceBussiness } from 'src/app/core/Business/invoiceBussiness';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ],
  providers: [
    BaseService,
    InvoiceBussiness
  ],
  declarations: [InvoiceComponent]
})
export class InvoiceModule { }
