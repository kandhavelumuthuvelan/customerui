import { SearchService } from './../services/SearchService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchModel } from '../model/SearchModel';
@Injectable()
export class SearchBusiness {
    constructor(private service: SearchService) { }

    GetProductSearch(key: string): Observable<SearchModel[]> {
        return this.service.get(`ProductSearch/GetProductSearch/${key}`);
    }

    GetSellerSearch(key: string): Observable<SearchModel[]> {
        return this.service.get(`ProductSearch/GetSellerSearch/${key}`);
    }
}
