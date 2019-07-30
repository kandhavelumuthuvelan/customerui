import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrderBusiness } from './../../core/Business/OrderBusiness';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderService } from 'src/app/core/services/OrderService';
import { DeliveryComponent } from './delivery/delivery.component';
import {ProgressBarModule} from 'angular-progress-bar';
@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    InfiniteScrollModule,
    ProgressBarModule
  ],
  declarations: [OrderComponent, DeliveryComponent],
  providers: [OrderBusiness, OrderService]
})
export class OrderModule { }
