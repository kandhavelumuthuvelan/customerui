import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/core/model/ProductModel';
import { Subject } from 'rxjs';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeUntil } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  LoggedInUser: string;
  RentalProducts: ProductModel[] = [];
  TopRentalProducts: ProductModel[] = [];
  Page = 1;
  PageSize = 8;
  DubPageRentel = 1;

  constructor(
    private titleService: Title,
    private product: ProductBusiness,
    public toastr: ToastrManager,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Hire Rental Equipments for Construction Services Online Chennai | Dooyd');
    this.meta.updateTag({ name: 'Description', content: 'Equipment Rentals such as Generator, Crane, Excavator, JCP, roller, Forklift Online in Chennai. Dooyd Offers an Online Marketplace for all Construction Services. Hire Now.' });
    this.meta.updateTag({ name: 'Keywords', content: 'Hire Equipments for Rental Online, Rental Equipments Online in Chennai' });
    this.GetRentalProducts();
  }
  GetRentalProducts() {
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

  GetTopRentalProducts() {
    this.product.GetTopRentalProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopRentalProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  LoadMore() {

    this.Page = Number((this.RentalProducts.length / this.PageSize).toFixed()) + 1;
    if (this.Page > this.DubPageRentel) {
      this.GetRentalProductsScroll();
      this.DubPageRentel = this.Page;
    }
    this.Page = 1;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
