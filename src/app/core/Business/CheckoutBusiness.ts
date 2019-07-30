import { PlaceOrderModel, DirectPaymentModel } from './../model/PlaceOrderModel';
import { ProfileAddressModel } from './../model/ProfileAddressModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModel } from '../model/CartModel';
import { CheckoutService } from '../services/CheckoutService';
@Injectable()
export class CheckoutBusiness {
  constructor(private service: CheckoutService) { }

  GetCartProducts(): Observable<CartModel[]> {
    return this.service.get('Cart/GetCheckout');
  }

  GetCustomerAddresses(): Observable<ProfileAddressModel[]> {
    return this.service.get('CustomerAddress/GetCustomerAddresses');
  }

  PlaceOrder(PlaceOrder: PlaceOrderModel): Observable<PlaceOrderModel> {
    return this.service.post<any>('Order/PlaceOrder', (PlaceOrder));
  }

  DirectPayment(data: DirectPaymentModel): Observable<DirectPaymentModel> {
    return this.service.post<any>('Order/DirectPayment', (data));
  }
}

