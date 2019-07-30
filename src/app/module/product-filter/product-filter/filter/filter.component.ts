import { AreaModel } from './../../../../core/model/ProductFilterModel';
import { LoginBusiness } from 'src/app/core/Business/business';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterBusiness } from 'src/app/core/Business/FilterBusiness';
import { ProductFilterModel, ProductFilterPagingModel, ProductFilterAreaPagingModel } from 'src/app/core/model/ProductFilterModel';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { SharedService } from 'src/app/core/services/SharedService';
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
  source: string;
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
      this.source = params['source'];
    });
    this.loggedUser.getLoggedInUserID.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.LoggedInUser = x;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Product Filter');
    this.page = 1;
    this.search.valueChanges.subscribe(
      x => {
        this.area = x;
        this.GetProductArea();
      });
    this.GetSearchProduct();
    this.filter.filterEmit.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.key = x.key;
      this.source = x.source;
      this.page = 1;
      this.GetSearchProduct();
    });
  }

  onSearchSubmit(key: string): void {
    this.page = 1;
    this.GetSearchProduct();
  }

  onSearchKeydown() {
      this.page = 1;
      this.GetSearchProduct();
  }

  GetProductArea() {
    const data: ProductFilterAreaPagingModel = { source: this.source, key: this.key, area: this.area, page: this.page };
    this.FBusiness.GetProductArea(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.ProductArea = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  GetSearchProduct() {
    const filterData: ProductFilterPagingModel = { source: this.source, key: this.key, area: this.area, page: this.page };
    this.FBusiness.GetSearchProduct(filterData).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
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
