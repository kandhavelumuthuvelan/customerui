import { FilterService } from './../../core/services/filterservice';
import { FilterBusiness } from 'src/app/core/Business/FilterBusiness';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WishlistService } from './../../core/services/wishlistService';
import { WishlistBusiness } from './../../core/Business/WishlistBusiness';
import { CartService } from './../../core/services/CartService';
import { CartBusiness } from './../../core/Business/CartBusiness';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductService } from 'src/app/core/services/ProductService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { RatingModule } from 'ng-starrating';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    NgxDaterangepickerMd.forRoot(),
    InfiniteScrollModule,
    RatingModule
  ],
  declarations: [DetailComponent],
  providers: [
    ProductBusiness,
    ProductService,
    CartBusiness,
    CartService,
    WishlistBusiness,
    WishlistService, FilterBusiness, FilterService
  ]
})
export class ProductDetailModule { }
