import { AuthGuard } from './../../core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MupComponent } from './mup/mup.component';

const routes: Routes = [
  {
    path: '',
    component: MupComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MupRoutingModule { }
