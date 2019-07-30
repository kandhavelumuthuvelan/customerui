import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductService } from 'src/app/core/services/ProductService';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionRoutingModule } from './construction-routing.module';
import { ConstructionComponent } from './construction/construction.component';

@NgModule({
  imports: [
    CommonModule,
    ConstructionRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [ConstructionComponent],
  providers: [ProductBusiness, ProductService]
})
export class ConstructionModule { }
