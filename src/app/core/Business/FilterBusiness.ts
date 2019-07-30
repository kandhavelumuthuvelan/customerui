import { AreaModel } from './../model/ProductFilterModel';
import { FilterService } from './../services/filterservice';
import { ProductModel } from './../model/ProductModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilterModel, ProductFilterPagingModel, FilterSectorModel, ProductFilterAreaPagingModel } from '../model/ProductFilterModel';
import { SearchModel } from '../model/SearchModel';
@Injectable()

export class FilterBusiness {
  constructor(private service: FilterService) { }

  GetSearchProduct(data: ProductFilterPagingModel): Observable<ProductFilterModel[]> {
    return this.service.post<any>('ProductSearch/GetSearchProduct', (data));
  }

  GetSearchSellerProduct(data: ProductFilterPagingModel): Observable<ProductFilterModel[]> {
    return this.service.post<any>('ProductSearch/GetSearchSellerProduct', (data));
  }

  GetFilterSectorProducts(data: ProductFilterPagingModel): Observable<FilterSectorModel[]> {
    return this.service.post<any>('Product/GetFilterSectorProducts', (data));
  }

  InsertWishlist(id: string): Observable<ProductModel> {
    return this.service.post<any>(`Wishlist/InsertWishlist/${id}`);
  }

  InsertCart(id: string): Observable<ProductModel> {
    return this.service.post<any>(`Cart/InsertCart/${id}`);
  }

  GetProductArea(data: ProductFilterAreaPagingModel): Observable<AreaModel[]> {
    return this.service.post<any>('ProductSearch/GetProductArea', (data));
  }

  GetSellerProductArea(data: ProductFilterAreaPagingModel): Observable<AreaModel[]> {
    return this.service.post<any>('ProductSearch/GetSellerProductArea', (data));
  }


}
