import { ResetPasswordService } from './../../core/services/ResetPasswordService';
import { ResetPasswordBusiness } from 'src/app/core/Business/ResetPasswordBusiness';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResetPasswordBusiness,
    ResetPasswordService
  ],
  declarations: [ResetComponent]
})
export class ResetPasswordModule { }
