import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WishlistModel } from './../../../core/model/WishlistModel';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WishlistBusiness } from './../../../core/Business/WishlistBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();

  WishlistProducts: WishlistModel[];

  constructor(
    private titleService: Title,
    private wishlist: WishlistBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Your Wishlist');
    this.GetWishlist();
  }

  GetWishlist() {
    this.wishlist
      .GetWishlistProducts()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(
        x => {
          this.WishlistProducts = x;
        },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        }
      );
  }

  addToCart(id: string): void {
    this.wishlist
      .MoveToCart(id)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(
        x => {
          // const index = this.WishlistProducts.findIndex(
          //   d => d.id === id
          // );
          if (x === 'Cart already has the same product') {
            this.toastr.warningToastr('Cart already has the same product');
          } else {
            // this.WishlistProducts.splice(index);
            // this.GetWishlist();
            this.toastr.successToastr(x);
            this._route.navigate(['cart']);
          }
        },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        }
      );
  }

  deleteFromWishlist(id: string): void {
    this.wishlist
      .DeleteWishlist(id)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(
        x => {
          this.toastr.successToastr(x);
          this.GetWishlist();
        },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        }
      );
  }

  GoToCart(): void {
    this._route.navigate(['cart']);

  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
