import { LoginBusiness } from './../../../core/Business/LoginBusiness';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from 'src/app/core/model/ProductModel';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.css']
})
export class ProcurementComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  LoggedInUser: string;
  ProcurementProducts: ProductModel[] = [];
  TopProcurementProducts: ProductModel[] = [];
  DubPageProd = 1;
  Page = 1;
  PageSize = 8;
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private product: ProductBusiness,
    private loggedUser: LoginBusiness,
    public toastr: ToastrManager,
    private _route: Router,
    private meta: Meta
  ) {
    this.loggedUser.getLoggedInUserID.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.LoggedInUser = x;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Procurement - Buy Industrial, Building Construction Materials Online | Dooyd');
    this.meta.updateTag({ name: 'Description', content: 'Buy Industrial, Building Construction Procurement Materials Online at Low Price in Chennai. Dooyd is an Online Marketplace for Your Every Construction Needs. Shop Now!' });
    this.meta.updateTag({ name: 'Keywords', content: 'Buy Building Materials Online, Buy Construction Materials Online' });
    this.GetProcurementProducts();
  }
  GetProcurementProducts() {
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

  GetTopProcurementProducts() {
    this.product.GetTopProcurementProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopProcurementProducts = x;
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

  LoadMore() {
    this.Page = Number((this.ProcurementProducts.length / this.PageSize).toFixed()) + 1;
    if (this.Page > this.DubPageProd) {
      this.GetProcurementProductsScroll();
      this.DubPageProd = this.Page;
    }
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
