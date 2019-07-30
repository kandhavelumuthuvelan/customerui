import { EmitFilterModel } from './../model/ProductFilterModel';
import { Router } from '@angular/router';
import { SearchModel } from './../model/SearchModel';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SearchBusiness } from './../Business/SearchBusiness';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../services/SharedService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  Placeholder: string;
  ProductSearch: SearchModel[];
  searchForm: FormGroup;
  search: FormControl = new FormControl();
  constructor(
    private business: SearchBusiness,
    public toastr: ToastrManager,
    private _route: Router,
    private filter: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.Placeholder = 'Search products here ex. pump';
    this.searchForm = this.fb.group({
      searchType: []
    });
    this.searchForm.patchValue({
      searchType: '1'
    });
    this.search.valueChanges.subscribe(
      x => {
        if (x.length >= 3) {
          if (this.searchForm.value.searchType === '1') {
            this.GetProductSearch(x);

          } else {
            this.GetSellerSearch(x);
          }
        }
      });
  }

  GetProductSearch(key: string) {
    this.business.GetProductSearch(key).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.ProductSearch = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  GetSellerSearch(key: string) {
    this.business.GetSellerSearch(key).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.ProductSearch = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }
  onSearchSubmit(key: string): void {
    if (key !== null) {
      if (key.length >= 2) {
        if (this.searchForm.value.searchType === '1') {
          const data: EmitFilterModel = { source: 'product', key: key};
          this.filter.EmitFilterData(data);
          this._route.navigate(['product-filter/product/' + key]);
        } else {
          const data: EmitFilterModel = { source: 'seller', key: key};
          this.filter.EmitFilterData(data);
          this._route.navigate(['product-filter/seller/' + key]);
        }
      }
    }
  }

  onSearchKeydown() {
    if (this.search.value !== null) {
      if (this.search.value.length >= 2) {
        if (this.searchForm.value.searchType === '1') {
          const data: EmitFilterModel = { source: 'product', key: this.search.value};
          this.filter.EmitFilterData(data);
          this._route.navigate(['product-filter/product/' + this.search.value]);
        } else {
          const data: EmitFilterModel = { source: 'seller', key: this.search.value};
          this.filter.EmitFilterData(data);
          this._route.navigate(['product-filter/seller/' + this.search.value]);
        }
      }
    }
  }

  onChangeSearch(id: string) {
    if (id === '2') {
      this.Placeholder = 'Search supplier here ex. konnak';
    } else {
      this.Placeholder = 'Search products here ex. pump';
    }
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
