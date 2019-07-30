import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutBusiness } from 'src/app/core/Business/CheckoutBusiness';
import { CheckoutService } from 'src/app/core/services/CheckoutService';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CheckoutComponent],
  providers: [CheckoutBusiness, CheckoutService]
})
export class CheckoutModule { }
