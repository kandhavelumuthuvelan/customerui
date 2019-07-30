import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ProductModel } from 'src/app/core/model/ProductModel';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeUntil } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  ConstructionProducts: ProductModel[] = [];
  TopConstructionProducts: ProductModel[] = [];
  Page = 1;
  PageSize = 8;
  DubPageConstruction = 1;

  constructor(
    private titleService: Title,
    private product: ProductBusiness,
    public toastr: ToastrManager,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Residential, Commercial & Industrial Construction Services Online | Dooyd');
    this.meta.updateTag({ name: 'Description', content: 'Get All Types of Residential, Commercial and Industrial Construction Services Online in Chennai at Dooyd with Low Price. Checkout now for best construction services.' });
    this.meta.updateTag({ name: 'Keywords', content: 'Construction Services Online' });

    this.GetConstructionProducts();
  }

  GetConstructionProducts() {

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

  GetTopConstructionProducts() {
    this.product.GetTopConstructionProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopConstructionProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  LoadMore() {
    this.Page = Number((this.ConstructionProducts.length / this.PageSize).toFixed()) + 1;
    if (this.Page > this.DubPageConstruction) {
      this.GetConstructionProductsScroll();
      this.DubPageConstruction = this.Page;
    }
    this.Page = 1;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
