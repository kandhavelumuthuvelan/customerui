import { LoginBusiness } from './../../../core/Business/LoginBusiness';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FilterSectorModel, ProductFilterPagingModel, ProductFilterAreaPagingModel, AreaModel } from './../../../core/model/ProductFilterModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilterBusiness } from './../../../core/Business/FilterBusiness';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { SharedService } from 'src/app/core/services/SharedService';
declare var $: any;

@Component({
  selector: 'app-filter-sector',
  templateUrl: './filter-sector.component.html',
  styleUrls: ['./filter-sector.component.css']
})
export class FilterSectorComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  LoggedInUser: string;
  filterForm: FormGroup;
  key: string;
  area: string;
  Products: FilterSectorModel[] = [];
  ProductArea: AreaModel[];
  page = 1;
  // InputData: ProductFilterPagingModel;
  search: FormControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    public toastr: ToastrManager,
    private Business: FilterBusiness,
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
    this.titleService.setTitle('Menu Filter');
    this.filterForm = this.fb.group({
      key: [],
      page: []
    });
    this.page = 1;
    this.search.valueChanges.subscribe(
      x => {
        if (x.length >= 2) {
          this.area = x;
          this.GetProductArea();
        }
      });
    this.GetFilterSectorProducts();
    this.filter.filterKeyword.subscribe(x => {
      this.key = x;
      this.page = 1;
      this.GetFilterSectorProducts();
    });
  }

  GetProductArea() {
    const data: ProductFilterAreaPagingModel = this.filterForm.value;
    data.area = this.area;
    data.key = this.key;
    this.Business.GetProductArea(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.ProductArea = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }


  onSearchSubmit(key: string): void {
    if (this.search.value !== '') {
      this.page = 1;
      this.GetFilterSectorProducts();
    }
  }

  onSearchKeydown() {
    if (this.search.value !== '') {
      this.page = 1;
      this.GetFilterSectorProducts();
    }
  }

  GetFilterSectorProducts() {
    let filterData: ProductFilterPagingModel;
    filterData = this.filterForm.value;
    filterData.key = this.key;
    filterData.area = this.area;
    filterData.page =  this.page;
    this.Business.GetFilterSectorProducts(filterData).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
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
    this.GetFilterSectorProducts();
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
