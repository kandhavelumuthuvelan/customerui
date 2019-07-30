import { ResetPasswordBusiness } from './../../core/Business/ResetPasswordBusiness';
import { ResetPasswordService } from './../../core/services/ResetPasswordService';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResetPasswordBusiness,
    ResetPasswordService
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
