import { ProductMupModel, AddReviewCommentModel, ReviewCommentPagingModel, ReviewCommentModel } from './../model/ProductDetail';
import { CartInsertModel } from './../model/CartModel';
import { ProductModel } from './../model/ProductModel';
import { ProductService } from './../services/ProductService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../model/ProductDetail';
import { ProductDescription } from '../model/ProductDescription';
@Injectable()
export class ProductBusiness {
  constructor(private service: ProductService) { }

  GetTopProcurementProducts(): Observable<ProductModel[]> {
    return this.service.post<any>(`Product/GetTopProcurementProducts`);
  }

  GetTopDesignEngineeringProducts(): Observable<ProductModel[]> {
    return this.service.post<any>(`Product/GetTopDesignEngineeringProducts`);
  }

  GetTopConstructionProducts(): Observable<ProductModel[]> {
    return this.service.post<any>(`Product/GetTopConstructionProducts`);
  }

  GetTopRentalProducts(): Observable<ProductModel[]> {
    return this.service.post<any>(`Product/GetTopRentalProducts`);
  }


  GetProcurementProducts(page: number): Observable<ProductModel[]> {
    return this.service.post<any>(`Product/GetProcurementProducts/${page}`);
  }

  GetDesignEngineeringProducts(page: number): Observable<ProductModel[]> {
    return this.service.post<any[]>(`Product/GetDesignEngineeringProducts/${page}`
    );
  }

  GetConstructionProducts(page: number): Observable<ProductModel[]> {
    return this.service.post<any[]>(`Product/GetConstructionProducts/${page}`);
  }

  GetRentalProducts(page: number): Observable<ProductModel[]> {
    return this.service.post<any[]>(`Product/GetRentalProducts/${page}`);
  }

  InsertWishlist(id: string): Observable<ProductModel> {
    return this.service.post<any>(`Wishlist/InsertWishlist/${id}`);
  }

  InsertCart(id: string): Observable<ProductModel> {
    return this.service.post<any>(`Cart/InsertCart/${id}`);
  }

  InsertCartWithDate(data: CartInsertModel): Observable<CartInsertModel> {
    return this.service.post<any>('Cart/InsertCartWithDate', (data));
  }

  InsertMupRequest(data: ProductMupModel): Observable<ProductMupModel> {
    return this.service.post<any>('MutualProduct/InsertMupRequest', (data));
  }

  GetProductDetail(id: string): Observable<ProductDetail> {
    return this.service.get<ProductDetail>(`Product/GetProductDetail/${id}`);
  }

  AddProductReview(data: AddReviewCommentModel): Observable<any> {
    return this.service.post<any>('ProductReview/AddProductReview', (data));
  }

  GetProductReview(data: ReviewCommentPagingModel): Observable<ReviewCommentModel[]> {
    return this.service.post('ProductReview/GetProductReview', (data));
}

  GetProductDescription(id: string): Observable<ProductDescription> {
    return this.service.get<ProductDescription>(
      `Product/GetProductDescription/${id}`
    );
  }
}
