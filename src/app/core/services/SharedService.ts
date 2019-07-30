import { EmitFilterModel } from './../model/ProductFilterModel';
import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService implements OnInit, OnDestroy {

    public filterKeyword: Subject<string> = new Subject();
    public filterSource: Subject<string> = new Subject();
    public RelatedProduct: Subject<EmitFilterModel> = new Subject();
    public filterEmit: Subject<EmitFilterModel> = new Subject();

    public userName: Subject<any> = new Subject();
    ngOnInit(): void {

    }

    EmitSerachKeyword(keyword: string, source: string) {
        this.filterKeyword.next(keyword);
        this.filterSource.next(source);
    }
    EmitRelatedProduct(data: EmitFilterModel) {
        this.RelatedProduct.next(data);
    }

    EmitFilterData(data: EmitFilterModel) {
        this.filterEmit.next(data);
    }

    EmitName(name: any) {
        this.userName.next(name);
    }


    ngOnDestroy(): void {

    }

}
