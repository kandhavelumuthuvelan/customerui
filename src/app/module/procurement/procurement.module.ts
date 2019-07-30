import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductService } from 'src/app/core/services/ProductService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';
import { ProcurementComponent } from './procurement/procurement.component';

@NgModule({
  imports: [
    CommonModule,
    ProcurementRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [ProcurementComponent],
  providers: [ProductBusiness, ProductService]
})
export class ProcurementModule { }
