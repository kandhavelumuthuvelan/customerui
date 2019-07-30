import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginBusiness } from './../../../core/Business/LoginBusiness';
import { ProductBusiness } from './../../../core/Business/ProductBusiness';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/core/model/productModel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();

  LoggedInUser: string;
  ProcurementProducts: ProductModel[] = [];
  DesignEngineeringProducts: ProductModel[] = [];
  ConstructionProducts: ProductModel[] = [];
  RentalProducts: ProductModel[] = [];
  TopProcurementProducts: ProductModel[] = [];
  TopDesignEngineeringProducts: ProductModel[] = [];
  TopConstructionProducts: ProductModel[] = [];
  TopRentalProducts: ProductModel[] = [];

  Page = 1;
  PageSize = 8;

  DubPageProd = 1;
  DubPageDesign = 1;
  DubPageConstruction = 1;
  DubPageRentel = 1;

  procurementScroll: string;
  designEngineeringScroll: string;
  constructionScroll: string;
  rentalScroll: string;

  constructor(
    private fb: FormBuilder,
    private product: ProductBusiness,
    private loggedUser: LoginBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) {
    this.loggedUser.getLoggedInUserID.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.LoggedInUser = x;
    });
  }

  ngOnInit() {
    this.GetProcurementProducts();
  }

  GetProcurementProducts() {

    this.procurementScroll = 'true';
    this.designEngineeringScroll = 'false';
    this.constructionScroll = 'false';
    this.rentalScroll = 'false';

    if (!this.ProcurementProducts || this.ProcurementProducts.length === 0) {
      this.GetProcurementProductsScroll();
    }
  }

  GetProcurementProductsScroll() {
    if (this.Page === 1) {
      this.GetTopProcurementProducts();
    }
    this.product.GetProcurementProducts(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.ProcurementProducts.push(item);
        });
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }



  GetDesignEngineeringProducts() {

    this.procurementScroll = 'false';
    this.designEngineeringScroll = 'true';
    this.constructionScroll = 'false';
    this.rentalScroll = 'false';

    if (!this.DesignEngineeringProducts || this.DesignEngineeringProducts.length === 0) {
      this.GetDesignEngineeringProductsScroll();
    }
  }

  GetDesignEngineeringProductsScroll() {
    if (this.Page === 1) {
      this.GetTopDesignEngineeringProducts();
    }
    this.product.GetDesignEngineeringProducts(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.DesignEngineeringProducts.push(item);
        });
      }
    },
      error => {
        this.toastr.errorToastr('Something went wrong!');
      }
    );
  }

  GetConstructionProducts() {

    this.procurementScroll = 'false';
    this.designEngineeringScroll = 'false';
    this.constructionScroll = 'true';
    this.rentalScroll = 'false';

    if (!this.ConstructionProducts || this.ConstructionProducts.length === 0) {
      this.GetConstructionProductsScroll();
    }
  }

  GetConstructionProductsScroll() {
    if (this.Page === 1) {
      this.GetTopConstructionProducts();
    }
    this.product.GetConstructionProducts(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.ConstructionProducts.push(item);
        });
      }
    },
      error => {
        this.toastr.errorToastr('Something went wrong!');
      }
    );
  }

  GetRentalProducts() {

    this.procurementScroll = 'false';
    this.designEngineeringScroll = 'false';
    this.constructionScroll = 'false';
    this.rentalScroll = 'true';

    if (!this.RentalProducts || this.RentalProducts.length === 0) {
      this.GetRentalProductsScroll();
    }
  }

  GetRentalProductsScroll() {
    if (this.Page === 1) {
      this.GetTopRentalProducts();
    }
    this.product.GetRentalProducts(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.RentalProducts.push(item);
        });
      }
    },
      error => {
        this.toastr.errorToastr('Something went wrong!');
      }
    );
  }

  GetTopProcurementProducts() {
    this.product.GetTopProcurementProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopProcurementProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  GetTopDesignEngineeringProducts() {
    this.product.GetTopDesignEngineeringProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopDesignEngineeringProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  GetTopConstructionProducts() {
    this.product.GetTopConstructionProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopConstructionProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  GetTopRentalProducts() {
    this.product.GetTopRentalProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopRentalProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
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

  LoadMore() {

    if (this.procurementScroll === 'true') {
      this.Page = Number((this.ProcurementProducts.length / this.PageSize).toFixed()) + 1;
      if (this.Page > this.DubPageProd) {
        this.GetProcurementProductsScroll();
        this.DubPageProd = this.Page;
      }
    }

    if (this.designEngineeringScroll === 'true') {
      this.Page = Number((this.DesignEngineeringProducts.length / this.PageSize).toFixed()) + 1;
      if (this.Page > this.DubPageDesign) {
        this.GetDesignEngineeringProductsScroll();
        this.DubPageDesign = this.Page;
      }
    }

    if (this.constructionScroll === 'true') {
      this.Page = Number((this.ConstructionProducts.length / this.PageSize).toFixed()) + 1;
      if (this.Page > this.DubPageConstruction) {
        this.GetConstructionProductsScroll();
        this.DubPageConstruction = this.Page;
      }
    }

    if (this.rentalScroll === 'true') {
      this.Page = Number((this.RentalProducts.length / this.PageSize).toFixed()) + 1;
      if (this.Page > this.DubPageRentel) {
        this.GetRentalProductsScroll();
        this.DubPageRentel = this.Page;
      }
    }

    this.Page = 1;
  }

  quickView(product) {
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

  viewProductDetail(id: string) {
    this._route.navigate(['product-detail/' + id]);
  }

}
