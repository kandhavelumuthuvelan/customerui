import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRoutingModule } from './return-routing.module';
import { ReturnComponent } from './return/return.component';

@NgModule({
  imports: [
    CommonModule,
    ReturnRoutingModule
  ],
  declarations: [ReturnComponent]
})
export class ReturnModule { }
