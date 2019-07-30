import { LoginBusiness } from 'src/app/core/Business/business';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FilterBusiness } from 'src/app/core/Business/FilterBusiness';
import { Title } from '@angular/platform-browser';
import { AreaModel, ProductFilterAreaPagingModel, ProductFilterPagingModel } from '../../../core/model/ProductFilterModel';
import { ProductFilterModel } from 'src/app/core/model/ProductFilterModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { SharedService } from 'src/app/core/services/SharedService';
import { takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  LoggedInUser: string;
  filterForm: FormGroup;
  key: string;
  area: string;
  Products: ProductFilterModel[] = [];
  ProductArea: AreaModel[];
  page = 1;
  search: FormControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    public toastr: ToastrManager,
    private FBusiness: FilterBusiness,
    private route: ActivatedRoute,
    private loggedUser: LoginBusiness,
    private product: ProductBusiness,
    private filter: SharedService,
    private _route: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.key = params['key'];
    });
    this.loggedUser.getLoggedInUserID.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.LoggedInUser = x;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Product Filter');
    this.filterForm = this.fb.group({
      key: [],
      page: []
    });
    this.page = 1;
    this.search.valueChanges.subscribe(
      x => {
        if (x.length >= 2) {
          this.area = x;
          this.GetSellerProductArea();
        }
      });
    this.GetSearchProduct();
    this.filter.filterKeyword.subscribe(x => {
      this.key = x;
      this.page = 1;
      this.GetSearchProduct();
    });
  }

  onSearchSubmit(key: string): void {
    if (this.search.value !== '') {
      this.page = 1;
      this.GetSearchProduct();
    }
  }

  onSearchKeydown() {
    if (this.search.value !== '') {
      this.page = 1;
      this.GetSearchProduct();
    }
  }

  GetSellerProductArea() {
    const data: ProductFilterAreaPagingModel = this.filterForm.value;
    data.area = this.area;
    data.key = this.key;
    this.FBusiness.GetSellerProductArea(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.ProductArea = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  GetSearchProduct() {
    let filterData: ProductFilterPagingModel;
    filterData = this.filterForm.value;
    filterData.key = this.key;
    filterData.area = this.area;
    filterData.page = this.page;
    this.FBusiness.GetSearchSellerProduct(filterData).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        if (this.page !== 1) {
          x.forEach(item => {
            this.Products.push(item);
          });
        } else {
          this.Products = x;
        }
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  LoadMore() {
    this.page = this.page + 1;
    this.GetSearchProduct();
  }

  addToCart(id: string): void {
    let status;
    if (this.LoggedInUser) {
      this.product.InsertCart(id)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe(
          x => {
            status = x;
            this.toastr.successToastr(status);
            this._route.navigate(['cart']);
          },
          error => {
            this.toastr.errorToastr('Something went wrong!');
          }
        );
    } else {
      $('#login-modal').modal('show');
    }
  }

  addToWishList(id: string): void {
    let status;
    if (this.LoggedInUser) {
      this.product.InsertWishlist(id)
        .pipe(takeUntil(this.componetDestroyed))
        .subscribe(
          x => {
            status = x;
            if (status === 'Product Already Exists in Wishlist') {
              this.toastr.warningToastr('Product Already Exists in Wishlist');
            } else {
              this.toastr.successToastr(status);
            }
          },
          error => {
            this.toastr.errorToastr('Something went wrong!');
          }
        );
    } else {
      $('#login-modal').modal('show');
    }
  }


  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}