import { SliderService } from './../../core/services/SliderService';
import { SliderBusiness } from './../../core/Business/SliderBusiness';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductService } from './../../core/services/ProductService';
import { ProductBusiness } from './../../core/Business/ProductBusiness';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { ProductComponent } from './product/product.component';
import { IndexComponent } from './index/index.component';
import { SliderComponent } from './slider/slider.component';
import {SlideshowModule} from 'ng-simple-slideshow';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule,
    InfiniteScrollModule,
    SlideshowModule
  ],
  declarations: [ProductComponent, IndexComponent, SliderComponent],
  providers: [ProductBusiness, ProductService, SliderBusiness, SliderService]
})
export class IndexModule { }
