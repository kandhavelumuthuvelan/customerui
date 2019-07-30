import { CareerBusiness } from './../../core/Business/CareerBusiness';
import { CareerService } from './../../core/services/CareerService';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerDetailRoutingModule } from './career-detail-routing.module';
import { CareerDetailComponent } from './career-detail/career-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CareerDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CareerDetailComponent],
  providers: [CareerBusiness, CareerService]
})
export class CareerDetailModule { }
