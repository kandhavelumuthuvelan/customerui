import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from '../../core/services/service';
import { ProfileBusiness} from '../../core/Business/business';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    ProfileService,
    ProfileBusiness
  ],
  declarations: [ProfileComponent]
})
export class CustomerModule { }
