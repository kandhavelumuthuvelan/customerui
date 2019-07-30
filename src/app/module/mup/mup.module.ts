import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MupRoutingModule } from './mup-routing.module';
import { MupComponent } from './mup/mup.component';
import { MupBusiness } from 'src/app/core/Business/MupBusiness';
import { MupService } from 'src/app/core/services/MupService';

@NgModule({
  imports: [
    CommonModule,
    MupRoutingModule
  ],
  declarations: [MupComponent],
  providers: [MupBusiness, MupService]
})
export class MupModule { }
