import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from 'src/app/core/model/ProductModel';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeUntil } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-engineering',
  templateUrl: './engineering.component.html',
  styleUrls: ['./engineering.component.css']
})
export class EngineeringComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();

  DesignEngineeringProducts: ProductModel[] = [];
  TopDesignEngineeringProducts: ProductModel[] = [];
  Page = 1;
  PageSize = 8;
  DubPageDesign = 1;

  constructor(
    private titleService: Title,
    private product: ProductBusiness,
    public toastr: ToastrManager,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Building, Industrial Design - Plans, Layouts, 3D Models & Interior Services | Dooyd');
    this.meta.updateTag({ name: 'Description', content: 'Checkout Dooyd for Building, Industrial Design & Engineering Plans, Layout, 3D Model, Drawings and Interior Design Services Online at Best Price in Chennai. Get Services Now.' });
    this.meta.updateTag({ name: 'Keywords', content: 'Building Design Online, Building Plans Online, Industrial Designs' });
    this.GetDesignEngineeringProducts();
  }

  GetDesignEngineeringProducts() {

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

  GetTopDesignEngineeringProducts() {
    this.product.GetTopDesignEngineeringProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.TopDesignEngineeringProducts = x;
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }


  LoadMore() {

    this.Page = Number((this.DesignEngineeringProducts.length / this.PageSize).toFixed()) + 1;
    if (this.Page > this.DubPageDesign) {
      this.GetDesignEngineeringProductsScroll();
      this.DubPageDesign = this.Page;
    }
    this.Page = 1;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
