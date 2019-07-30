import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrderBusiness } from 'src/app/core/Business/OrderBusiness';
import { takeUntil } from 'rxjs/operators';
import { OrderModel, OrderDetail } from 'src/app/core/model/OrderModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();

  public canLoadDelieryComponent: boolean;

  status: string;
  OrderProducts: OrderModel[][] = [];
  page = 1;
  orderId: string;
  OrderProductDetail: OrderDetail[][] = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private _route: Router,
    public toastr: ToastrManager,
    private Order: OrderBusiness
  ) {
    this.route.params.subscribe((params: Params) => {
      this.status = params['status'];
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Your Orders');
    if (this.status !== '') {

      switch (this.status) {

        case 'TXN_SUCCESS':
          this.toastr.successToastr('Order Placed successfully!');
          break;

        case 'TXN_FAILURE':
          this.toastr.errorToastr('Payment Failed!');
          break;

        case 'PENDING':
          this.toastr.warningToastr('Payment pending!');
          break;

        case 'something went wrong':
          this.toastr.errorToastr('something went wrong !');
          break;
      }
      this._route.navigate(['order']);
    }
    this.GetOrderProducts();
  }

  GetOrderProducts() {
    this.Order.GetOrderDetail(this.page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        if (x) {
          x.forEach(i => {
            this.OrderProductDetail.push(i);
          });
        }
      },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        });
  }

  Track(id: string): void {
    this.orderId = id;
    this.canLoadDelieryComponent = true;
  }

  Retry(id: string): void { }

  LoadMore() {
    this.page = this.page + 1;
    this.GetOrderProducts();
  }

  backToOrders() {
    this.orderId = undefined;
    this.canLoadDelieryComponent = false;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
