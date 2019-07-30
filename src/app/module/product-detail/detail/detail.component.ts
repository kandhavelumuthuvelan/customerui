import { EmitFilterModel } from './../../../core/model/ProductFilterModel';
import { FilterBusiness } from './../../../core/Business/FilterBusiness';
import { CartInsertModel } from './../../../core/model/CartModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ProductBusiness } from 'src/app/core/Business/ProductBusiness';
import {
  ProductDetail, ReviewCommentModel, ReviewCommentPagingModel,
  ProductMupModel, AddReviewCommentModel,
} from './../../../core/model/ProductDetail';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginBusiness } from 'src/app/core/Business/business';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductDescription } from 'src/app/core/model/ProductDescription';
import { Moment } from 'moment';
import { ProductFilterPagingModel, ProductFilterModel } from 'src/app/core/model/ProductFilterModel';
import { SharedService } from 'src/app/core/services/SharedService';
import { UserDetail } from 'src/app/core/model';
declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<null> = new Subject();
  btnViewMore = true;
  starRate = 5;
  page = 0;
  Reviewpage = 1;
  id: string;
  pName: string;
  availabilty: Array<number>;
  product: ProductDetail;
  public quantity = 1;
  LoggedInUser: string;
  detailForm: FormGroup;
  mupForm: FormGroup;
  FromToDate: { start: Moment; end: Moment };
  mupFromToDate: { start: Moment; end: Moment };
  Category: string;
  public IsformSubmit: boolean;
  public IsReviewformSubmit: boolean;
  activeSlide = 0;
  showresult = false;
  _productDescription: ProductDescription;
  Products: ProductFilterModel[] = [];
  SearchProductName = '';
  ReviewForm: FormGroup;
  LoggedInUserDetails: UserDetail;
  ProductReview: ReviewCommentModel[] = [];
  constructor(
    private meta: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private bussiness: ProductBusiness,
    public toastr: ToastrManager,
    private loggedUser: LoginBusiness,
    private _route: Router,
    private fb: FormBuilder,
    private FBusiness: FilterBusiness,
    private filter: SharedService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.pName = params['name'];
      const data: EmitFilterModel = { source: this.pName, key: this.id };
      this.filter.EmitRelatedProduct(data);
    });

    this.loggedUser.getLoggedInUserID
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(x => {
        this.LoggedInUser = x;
      });
  }

  ngOnInit() {
    this.ReviewForm = this.fb.group({
      comment: ['', Validators.compose([
        Validators.maxLength(250),
        Validators.required
      ])],
    });
    this.mupForm = this.fb.group({
      productId: [],
      sellerId: [],
      sellerName: [],
      productName: [],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      mupFromToDate: []
    });
    this.detailForm = this.fb.group({
      FromToDate: []
    });

    this.detailForm = this.fb.group({
      productId: [],
      fromDate: [],
      toDate: [],
    });
    this.Init();
    this.filter.RelatedProduct.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.id = x.key;
      this.Init();
    });

  }

  Init() {
    this.bussiness.GetProductDetail(this.id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.product = x;
      this.titleService.setTitle(this.product.name + '_' + this.product.category);
      this.meta.updateTag({ name: 'Description', content: this.product.name + '-' + this.product.category + ' | DooyD.com'});
      this.Category = this.product.category;
      this.SearchProductName = this.product.name.substring(0, 3);
      this.mupForm.controls.productName.setValue(this.product.name);
      this.mupForm.controls.productId.setValue(this.product.id);
      this.mupForm.controls.sellerId.setValue(this.product.sellerId);
      this.mupForm.controls.sellerName.setValue(this.product.sellerName);
    });
    this.bussiness.GetProductDescription(this.id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this._productDescription = x;
    });

    this.IsformSubmit = false;
    this.IsReviewformSubmit = false;
    this.GetProductReview();
  }


  switchSlide(x) {
    this.activeSlide = x;
  }

  imageZoom(imgID, resultID, event) {
    this.showresult = true;
    setTimeout(() => {
      // tslint:disable-next-line:no-var-keyword
      var img, lens, result, cx, cy;
      img = document.getElementById(imgID);
      result = document.getElementById(resultID);
      lens = document.createElement('DIV');
      lens.setAttribute('class', 'img-zoom-lens');
      const lengthh = event.target.getElementsByClassName('img-zoom-lens').length;
      if (lengthh === 0) {
        img.parentElement.insertBefore(lens, img);
      }
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
      result.style.backgroundImage = 'url(\'' + img.src + '\')';
      result.style.backgroundSize = (img.width * cx) + 'px ' + (img.height * cy) + 'px';
      lens.addEventListener('mousemove', moveLens);
      img.addEventListener('mousemove', moveLens);
      lens.addEventListener('touchmove', moveLens);
      img.addEventListener('touchmove', moveLens);
      function moveLens(e) {
        // tslint:disable-next-line:no-var-keyword
        var pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x - (lens.offsetWidth / 3);
        y = pos.y - (lens.offsetHeight / 3);
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
      }
      function getCursorPos(e) {
        // tslint:disable-next-line:no-var-keyword
        var a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    }, 200);
  }
  hideResult() {
    document.getElementById('myresult').style.backgroundImage = 'none';
    this.showresult = false;
  }

  onSubmit() {
    if (this.LoggedInUser) {
      this.IsformSubmit = true;
      if (this.mupForm.valid) {
        let data: ProductMupModel;
        data = this.mupForm.value;
        data.quantity = this.mupForm.value.quantity;
        data.description = this.mupForm.value.description;
        if (this.Category === 'Construction' || this.Category === 'Rental Equipments') {
          if (this.mupFromToDate === undefined) {
            this.toastr.warningToastr('From & To Date should not be empty !');
            return false;
          } else {
            data.fromDate = this.mupFromToDate.start.format('DD-MM-YYYY');
            data.toDate = this.mupFromToDate.end.format('DD-MM-YYYY');
          }
        } else {
          data.fromDate = '';
          data.toDate = '';
        }
        this.InsertMupRequest(data);
      }
    } else {
      $('#mup-view-modal').modal('hide');
      $('#login-modal').modal('show');
    }
  }

  addToCart(id: string) {
    if (this.LoggedInUser) {
      let data: CartInsertModel;
      data = this.detailForm.value;
      data.productId = id;
      if (this.Category === 'Construction' || this.Category === 'Rental Equipments') {
        if (this.FromToDate.start === null || this.FromToDate.end === null) {
          this.toastr.warningToastr('From & To Date should not be empty !');
          return false;
        } else {
          data.fromDate = this.FromToDate.start.format('DD-MM-YYYY');
          data.toDate = this.FromToDate.end.format('DD-MM-YYYY');
        }
      } else {
        data.fromDate = '';
        data.toDate = '';
      }
      this.InsertCartWithDate(data);
    } else {
      $('#login-modal').modal('show');
    }
  }

  InsertCartWithDate(data) {
    let status;
    this.bussiness.InsertCartWithDate(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      this.toastr.successToastr(status);
      this._route.navigate(['cart']);
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  InsertMupRequest(data) {
    let status;
    this.bussiness.InsertMupRequest(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      $('#mup-view-modal').modal('hide');
      this.toastr.successToastr(status);
      this._route.navigate(['/mup']);
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }




  addToWishList(id: string): void {
    let status;
    if (this.LoggedInUser) {
      this.bussiness
        .InsertWishlist(id)
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

  chat(id: string): void {
    if (this.LoggedInUser) {
      this._route.navigate(['/chat', id]);
    } else {
      $('#login-modal').modal('show');
    }
  }

  isInvalidDate(date) {
    return date.weekday() === 0;
  }

  isCustomDate(date) {
    return date.weekday() === 0 || date.weekday() === 6
      ? 'mycustomdate'
      : false;
  }

  get mupFormControls() {
    return this.mupForm.controls;
  }

  GetSearchProduct() {

    const filterData: ProductFilterPagingModel = {
      source: 'product', key: this.SearchProductName, area: '', page: this.page
    };
    this.FBusiness.GetSearchProduct(filterData).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
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
    this.GetSearchProduct();
  }

  ReviewLoadMore() {
    this.Reviewpage = this.Reviewpage + 1;
    this.GetProductReviewViewMore();
  }

  GetProductReview() {
    if (!this.ProductReview || this.ProductReview.length === 0) {
      this.GetProductReviewViewMore();
    }
  }

  GetProductReviewViewMore() {
    const data: ReviewCommentPagingModel = { productId: this.id, page: this.Reviewpage };
    this.bussiness.GetProductReview(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.ProductReview.push(item);
        });
      }
      if (x.length === 0 || x.length === null) {
        this.btnViewMore = false;
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  AddProductReview() {
    if (this.ReviewForm.valid) {
      this.IsReviewformSubmit = true;
      if (this.LoggedInUser) {
        this.LoggedInUserDetails = this.loggedUser.getLoggedInUserDetail();
        const data: AddReviewCommentModel = {
          productId: this.id, name: this.LoggedInUserDetails.name,
          rating: this.starRate, comments: this.ReviewForm.value.comment
        };
        this.bussiness.AddProductReview(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          if (x === 'Review added successfully') {
            const adddata: ReviewCommentModel = {
              productId: this.id, name: this.LoggedInUserDetails.name,
              rating: this.starRate, comments: this.ReviewForm.value.comment,
              createdDate: new Date()
            };
            this.ProductReview.splice(0, 0, adddata);
            this.toastr.successToastr(x);
            this.ReviewForm.reset();
          } else {
            this.toastr.warningToastr(x);
          }
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      } else {
        $('#login-modal').modal('show');
      }
    }
  }

  onRate($event: { oldValue: number, newValue: number }) {
    this.starRate = $event.newValue;
  }


  ChangeProduct(name: string, id: string): void {
    this._route.navigate(['product-detail/' + name + '/' + id]);
    const data: EmitFilterModel = { source: name, key: id };
    this.filter.EmitRelatedProduct(data);
  }

  onShare(media: string) {
    const x = screen.width / 2 - 700 / 2;
    const y = screen.height / 2 - 450 / 2;
    window.open(media + 'product-detail/' + this.product.name + '/' + this.id, this.product.name + '_' + this.product.category,
      'toolbar=0, status=0, width=700, height=485,left=' + x + ',top=' + y + '');
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
