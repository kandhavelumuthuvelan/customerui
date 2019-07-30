import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { RefundComponent } from './refund/refund.component';

@NgModule({
  imports: [
    CommonModule,
    RefundRoutingModule
  ],
  declarations: [RefundComponent]
})
export class RefundModule { }
