import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductService } from 'src/app/core/services/ProductService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalComponent } from './rental/rental.component';

@NgModule({
  imports: [
    CommonModule,
    RentalRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [RentalComponent],
  providers: [ProductBusiness, ProductService]
})
export class RentalModule { }
