import { CareerService } from './../../core/services/CareerService';
import { CareerBusiness } from './../../core/Business/CareerBusiness';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers/careers.component';

@NgModule({
  imports: [
    CommonModule,
    CareersRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [CareersComponent],
  providers: [CareerBusiness, CareerService]
})
export class CareersModule { }
