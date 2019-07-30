import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterBusiness } from 'src/app/core/Business/FilterBusiness';
import { FilterService } from '../../core/services/filterservice';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerFilterRoutingModule } from './seller-filter-routing.module';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    SellerFilterRoutingModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    MatInputModule, FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FilterComponent],
  providers: [FilterBusiness, FilterService]
})
export class SellerFilterModule { }
