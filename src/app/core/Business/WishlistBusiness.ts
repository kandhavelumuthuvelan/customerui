import { WishlistModel, WishlistViewModel } from './../model/WishlistModel';
import { Token } from './../model/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WishlistService } from '../services/wishlistService';
@Injectable()
export class WishlistBusiness {
  constructor(private service: WishlistService) {}

  GetWishlistProducts(): Observable<WishlistModel[]> {
    return this.service.get('Wishlist/GetWishlist');
  }


  DeleteWishlist(id: string): Observable<any> {
    return this.service.post<any>(`Wishlist/DeleteWishlist/${id}`);
  }

  MoveToCart(id: string): Observable<string> {
    return this.service.get<string>(`Cart/AddToCartFromWishlist/${id}`);
  }

}
