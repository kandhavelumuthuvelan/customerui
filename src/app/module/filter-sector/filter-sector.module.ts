import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterService } from './../../core/services/filterservice';
import { FilterBusiness } from './../../core/Business/FilterBusiness';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterSectorRoutingModule } from './filter-sector-routing.module';
import { FilterSectorComponent } from './filter-sector/filter-sector.component';

@NgModule({
  imports: [
    CommonModule,
    FilterSectorRoutingModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    MatInputModule, FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [FilterSectorComponent],
  providers: [FilterBusiness, FilterService]
})
export class FilterSectorModule { }
