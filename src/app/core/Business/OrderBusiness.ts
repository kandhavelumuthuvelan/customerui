import { DeliveryModel } from './../model/DeliveryModel';
import { OrderService } from './../services/OrderService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel, OrderDetail } from '../model/OrderModel';
@Injectable()
export class OrderBusiness {
  constructor(private service: OrderService) {}

  GetOrderProducts(page: number): Observable<OrderModel[][]> {
    return this.service.post<any>(`OrderProduct/GetOrder/${page}`);
  }

  GetDeliveryStatus(id: string): Observable<any> {
    return this.service.get<any>(`ProductDelivery/GetProductDelivery/${id}`);
  }

  GetOrderDetail(page: number): Observable<OrderDetail[][]> {
    return this.service.get<any>(`Order/OrderDetail/${page}`);
  }
}
