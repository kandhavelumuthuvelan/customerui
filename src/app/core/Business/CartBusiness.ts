import { CartViewModel } from './../model/CartModel';
import { CartService } from './../services/CartService';
import { Token } from './../model/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartModel } from '../model/CartModel';
@Injectable()
export class CartBusiness {
  constructor(private service: CartService) {}

  GetCartProducts(): Observable<CartModel[]> {
    return this.service.get('Cart/GetCart');
  }


  DeleteCart(id: string): Observable<any> {
    return this.service.post<any>(`Cart/DeleteCart/${id}`);
  }

  DecreaseQuantity(id: string): Observable<CartModel> {
    return this.service.post<any>(`Cart/DecreaseQuantity/${id}`);
  }

  IncreaseQuantity(id: string): Observable<CartModel> {
    return this.service.post<any>(`Cart/IncreaseCartQuantity/${id}`);
  }

}
