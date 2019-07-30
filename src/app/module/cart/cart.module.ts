import { CartService } from './../../core/services/CartService';
import { CartBusiness } from './../../core/Business/CartBusiness';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  declarations: [CartComponent],
  providers: [CartBusiness, CartService]
})
export class CartModule { }
