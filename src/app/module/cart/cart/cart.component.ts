import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CartBusiness } from './../../../core/Business/CartBusiness';
import { CartModel } from './../../../core/model/CartModel';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  CartProducts: CartModel[];
  cartTotal: number;
  constructor(
    private titleService: Title,
    private Cart: CartBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Your Cart');
    this.GetCart();
  }

  GetCart() {
    this.Cart.GetCartProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.CartProducts = x;
      this.cartTotal = this.CalculateCartTotal();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  CalculateCartTotal(): number {
    let Total = 0;
    for (let i = 0; i < this.CartProducts.length; i++) {

      if (this.CartProducts[i].dayCount !== 0) {
        Total += this.CartProducts[i].cost * this.CartProducts[i].quantity * this.CartProducts[i].dayCount;
      } else {
        Total += this.CartProducts[i].cost * this.CartProducts[i].quantity;
      }
    }
    return Total;
  }

  deleteFromCart(id: string): void {
    let status;
    this.Cart.DeleteCart(id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      this.toastr.successToastr(status);
      this.GetCart();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  increaseQuantity(id: string): void {
    let status;
    this.Cart.IncreaseQuantity(id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      // this.toastr.successToastr(status);
      this.GetCart();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  decreaseQuantity(id: string): void {
    let status;
    this.Cart.DecreaseQuantity(id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      if (status === 'Product Quantity Should be minimum 1') {
        this.toastr.warningToastr(status);
      } else {
        // this.toastr.successToastr(status);
      }
      this.GetCart();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  ProceedToCheckout(): void {
    if (this.cartTotal > 0) {
      this._route.navigate(['checkout']);
    } else {
      this.toastr.warningToastr('Should have minimum 1 product');
    }
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
