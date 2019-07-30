import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule
  ],
  declarations: [ContactusComponent]
})
export class ContactModule { }
