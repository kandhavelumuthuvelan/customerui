import { InstantBusiness } from 'src/app/core/Business/InstantBusiness';
import { InstantService } from './../../core/services/InstantService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstantRoutingModule } from './instant-routing.module';
import { InstantComponent } from './instant/instant.component';

@NgModule({
  imports: [
    CommonModule,
    InstantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    InstantService,
    InstantBusiness
  ],
  declarations: [InstantComponent]
})
export class InstantModule { }
