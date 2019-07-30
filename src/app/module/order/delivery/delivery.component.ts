import { DeliveryModel } from './../../../core/model/DeliveryModel';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderBusiness } from 'src/app/core/Business/OrderBusiness';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();
  @Input() OrderID: string;

  Confirmed: number;

  Delivery: DeliveryModel;
  canLoadDelieryComponent: boolean;
  constructor(
    private titleService: Title,
    private Order: OrderBusiness,
    public toastr: ToastrManager,
  ) { }

  ngOnInit() {
    this.Confirmed = 0;
    this.titleService.setTitle('Product Delivery Status');
    if (this.OrderID !== undefined) {
      this.GetDeliveryStatus(this.OrderID);
    }

  }

  GetDeliveryStatus(OrderID) {
    this.Order.GetDeliveryStatus(OrderID).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x) {
        this.Delivery = x;
        this.Confirmed = this.Delivery.confirmed;
      }

    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }
  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
