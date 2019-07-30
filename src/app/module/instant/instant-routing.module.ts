import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstantComponent } from './instant/instant.component';

const routes: Routes = [
  {
    path: '',
    component: InstantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstantRoutingModule { }
