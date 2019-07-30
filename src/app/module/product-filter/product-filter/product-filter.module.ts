import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterService } from './../../../core/services/filterservice';
import { FilterBusiness } from 'src/app/core/Business/FilterBusiness';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterRoutingModule } from './product-filter-routing.module';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    ProductFilterRoutingModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    MatInputModule, FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FilterComponent],
  providers: [FilterBusiness, FilterService]
})
export class ProductFilterModule { }
