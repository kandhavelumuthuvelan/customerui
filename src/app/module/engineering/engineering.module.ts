import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductService } from 'src/app/core/services/ProductService';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineeringRoutingModule } from './engineering-routing.module';
import { EngineeringComponent } from './engineering/engineering.component';

@NgModule({
  imports: [
    CommonModule,
    EngineeringRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [EngineeringComponent],
  providers: [ProductBusiness, ProductService]
})
export class EngineeringModule { }
