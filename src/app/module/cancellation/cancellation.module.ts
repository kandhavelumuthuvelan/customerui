import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancellationRoutingModule } from './cancellation-routing.module';
import { CancellationComponent } from './cancellation/cancellation.component';

@NgModule({
  imports: [
    CommonModule,
    CancellationRoutingModule
  ],
  declarations: [CancellationComponent]
})
export class CancellationModule { }
