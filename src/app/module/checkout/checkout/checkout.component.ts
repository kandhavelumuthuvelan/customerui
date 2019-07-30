import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PlaceOrderModel, DirectPaymentModel } from './../../../core/model/PlaceOrderModel';
import { MakePaymentModel } from './../../../core/model/MakePaymentModel';
import { ProfileAddressModel } from './../../../core/model/ProfileAddressModel';
import { ProfileBusiness } from './../../../core/Business/ProfileBusiness';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CheckoutBusiness } from './../../../core/Business/CheckoutBusiness';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CartModel } from './../../../core/model/CartModel';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  disablePaymentButton = true;
  btnSubmit = false;
  frmAddressDD = true;
  btnText = 'Edit';
  btnCancel = false;
  btnAddNewAddressShipping = true;
  btnAddNewAddressBilling = true;
  orderId: string;
  gateway = true;
  direct = false;
  cod = false;

  shippingid: string;
  panelBillingAddress = '';
  panelShiipingAddress = 'in';

  btnBillingSubmit = false;
  frmAddressBillingDD = true;
  btnBillingText = 'Edit';
  btnBillingCancel = false;

  CheckoutProducts: CartModel[];
  profileAddress: ProfileAddressModel;
  CustomerAddresses: ProfileAddressModel[];
  MakePayment: MakePaymentModel;
  placeOrder: PlaceOrderModel;

  addressForm: FormGroup;
  addressBillingForm: FormGroup;
  placeOrderForm: FormGroup;

  public IsaddressformSubmit: boolean;
  public IsaddressBillingformSubmit: boolean;
  public IsplaceOrderFormformSubmit: boolean;
  private _prevSelected: any;

  cartTotal: number;

  MID: string;
  CHANNEL_ID: string;
  INDUSTRY_TYPE_ID: string;
  WEBSITE: string;
  CUST_ID: string;
  ORDER_ID: string;
  TXN_AMOUNT: string;
  CALLBACK_URL: string;
  CHECKSUM: string;
  PAYTMURL: string;
  MOBILE_NO: string;
  EMAIL: string;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private Checkout: CheckoutBusiness,
    private CustomerProfile: ProfileBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Products Checkout');
    this.addressForm = this.fb.group({
      id: [],
      nameofaddress: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')

      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*')
      ])],
      property: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(4),
        Validators.required
      ])],
      street: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(4),
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      district: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      postcode: ['', Validators.compose([
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^[0-9]*')
      ])],
      addresstype: ['', Validators.required]
    });

    this.placeOrderForm = this.fb.group({
      shippingaddressid: ['', Validators.required],
      billingaddressid: ['', Validators.required],
    });

    this.addressBillingForm = this.fb.group({
      id: [],
      nameofaddress: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')

      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*')
      ])],
      property: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(4),
        Validators.required
      ])],
      street: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(4),
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      district: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      country: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.required
      ])],
      postcode: ['', Validators.compose([
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^[0-9]*')
      ])],
      addresstype: ['', Validators.required]
    });

    this.addressForm.disable();
    this.IsaddressformSubmit = false;

    this.addressBillingForm.disable();
    this.IsaddressBillingformSubmit = false;

    this.IsplaceOrderFormformSubmit = false;

    this.GetCart();
    this.GetCustomerAddresses();
  }

  GetCart() {
    this.Checkout.GetCartProducts().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.CheckoutProducts = x;
      this.cartTotal = this.CalculateCartTotal();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  GetCustomerAddresses() {
    this.Checkout.GetCustomerAddresses().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.CustomerAddresses = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  onChangeGetAddress(id: string) {
    if (id) {
      const index = this.CustomerAddresses.findIndex(
        d => d.id === id
      );
      this.profileAddress = this.CustomerAddresses[index];
      this.addressForm.patchValue({
        id: this.profileAddress.id,
        nameofaddress: this.profileAddress.nameofaddress,
        name: this.profileAddress.name,
        mobile: this.profileAddress.mobile,
        property: this.profileAddress.property,
        street: this.profileAddress.street,
        city: this.profileAddress.city,
        district: this.profileAddress.district,
        country: this.profileAddress.country,
        postcode: this.profileAddress.postcode,
        addresstype: this.profileAddress.addresstype,
      });
      this.btnSubmit = true;
      this.btnText = 'Edit';
      this.addressForm.disable();
    } else {
      this.addressForm.reset();
      this.btnSubmit = false;
      this.addressForm.disable();
    }
  }

  onChangeBillingGetAddress(id: string) {
    if (id) {
      const index = this.CustomerAddresses.findIndex(
        d => d.id === id
      );
      this.profileAddress = this.CustomerAddresses[index];
      this.addressBillingForm.patchValue({
        id: this.profileAddress.id,
        nameofaddress: this.profileAddress.nameofaddress,
        name: this.profileAddress.name,
        mobile: this.profileAddress.mobile,
        property: this.profileAddress.property,
        street: this.profileAddress.street,
        city: this.profileAddress.city,
        district: this.profileAddress.district,
        country: this.profileAddress.country,
        postcode: this.profileAddress.postcode,
        addresstype: this.profileAddress.addresstype,
      });
      this.btnBillingSubmit = true;
      this.btnBillingText = 'Edit';
      this.addressBillingForm.disable();
    } else {
      this.addressBillingForm.reset();
      this.btnBillingSubmit = false;
      this.addressBillingForm.disable();
    }
  }

  onAddressSubmit(): void {
    if (this.btnText === 'Edit') {
      this.addressForm.enable();
      this.btnText = 'Update';
    } else {
      let status;
      this.IsaddressformSubmit = true;
      if (this.addressForm.valid) {
        this.CustomerProfile.UpdateCustomerAddress(this.addressForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          status = x;
          this.toastr.successToastr(status);
          this.addressForm.disable();
          this.btnText = 'Edit';
          this.btnSubmit = false;
          this.GetCustomerAddresses();
          this.addressForm.reset();
          this.frmAddressDD = true;
          this.btnCancel = false;
          this.placeOrderForm.controls['shippingaddressid'].patchValue('');
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      }
    }
  }

  onAddressBillingSubmit(): void {
    if (this.btnBillingText === 'Edit') {
      this.addressBillingForm.enable();
      this.btnBillingText = 'Update';
    } else {
      let status;
      this.IsaddressBillingformSubmit = true;
      if (this.addressBillingForm.valid) {
        this.CustomerProfile.UpdateCustomerAddress(this.addressBillingForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          status = x;
          this.toastr.successToastr(status);
          this.addressBillingForm.disable();
          this.btnBillingText = 'Edit';
          this.btnBillingSubmit = false;
          this.GetCustomerAddresses();
          this.addressBillingForm.reset();
          this.frmAddressBillingDD = true;
          this.btnBillingCancel = false;
          this.placeOrderForm.controls['billingaddressid'].patchValue('');
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      }
    }
  }

  onAddNewAddress(): void {
    this.addressForm.reset();
    this.addressForm.enable();
    this.frmAddressDD = false;
    this.btnSubmit = true;
    this.btnCancel = true;
    this.btnText = 'Submit';

  }

  onAddNewBillingAddress(): void {
    this.addressBillingForm.reset();
    this.addressBillingForm.enable();
    this.frmAddressBillingDD = false;
    this.btnBillingSubmit = true;
    this.btnBillingCancel = true;
    this.btnBillingText = 'Submit';

  }

  onCancelAddress(): void {
    this.frmAddressDD = true;
    this.btnCancel = false;
    this.btnSubmit = false;
    this.addressForm.reset();
    this.addressForm.disable();
    this.placeOrderForm.controls['shippingaddressid'].patchValue('');
  }

  onCancelBillingAddress(): void {
    this.frmAddressBillingDD = true;
    this.btnBillingCancel = false;
    this.btnBillingSubmit = false;
    this.addressBillingForm.reset();
    this.addressBillingForm.disable();
    this.placeOrderForm.controls['billingaddressid'].patchValue('');
  }

  CalculateCartTotal(): number {
    let Total = 0;
    for (let i = 0; i < this.CheckoutProducts.length; i++) {
      if (this.CheckoutProducts[i].dayCount !== 0) {
        Total += this.CheckoutProducts[i].cost * this.CheckoutProducts[i].quantity * this.CheckoutProducts[i].dayCount;
      } else {
        Total += this.CheckoutProducts[i].cost * this.CheckoutProducts[i].quantity;
      }
    }
    return Total;
  }

  PlaceOrder() {
    if (this.cartTotal > 0) {
      this.IsplaceOrderFormformSubmit = true;
      if (this.placeOrderForm.valid) {
        this.placeOrderForm.disable();
        this.btnSubmit = false;
        this.btnBillingSubmit = false;
        this.btnAddNewAddressShipping = false;
        this.btnAddNewAddressBilling = false;
        this.Checkout.PlaceOrder(this.placeOrderForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          this.MakePayment = x;
          this.MID = this.MakePayment.mid;
          this.CHANNEL_ID = this.MakePayment.channelid;
          this.INDUSTRY_TYPE_ID = this.MakePayment.industrytypeid;
          this.WEBSITE = this.MakePayment.website;
          this.CUST_ID = this.MakePayment.custid;
          this.MOBILE_NO = this.MakePayment.mobileno;
          this.EMAIL = this.MakePayment.email;
          this.ORDER_ID = this.MakePayment.orderid;
          this.orderId = this.MakePayment.orderid;
          this.TXN_AMOUNT = this.MakePayment.txnamount;
          this.CALLBACK_URL = this.MakePayment.callbackurl;
          this.CHECKSUM = this.MakePayment.checksum;
          this.PAYTMURL = this.MakePayment.paytmurl;
          this.disablePaymentButton = false;
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      } else {
        this.shippingid = this.placeOrderForm.controls['shippingaddressid'].value;
        if (this.shippingid !== '') {
          this.panelBillingAddress = 'in';
          this.panelShiipingAddress = '';
        } else {
          this.panelBillingAddress = '';
          this.panelShiipingAddress = 'in';
        }
      }
    } else {
      this.toastr.warningToastr('Should have minimum 1 product');
    }
  }

  get addressFormControls() {
    return this.addressForm.controls;
  }

  get addressBillingFormControls() {
    return this.addressBillingForm.controls;
  }

  get placeOrderFormControls() {
    return this.placeOrderForm.controls;
  }

  Gateway(evt) {
    this.gateway = true;
    this.direct = false;
    this.cod = false;
  }

  Direct(evt) {
    this.gateway = false;
    this.direct = true;
    this.cod = false;
  }

  Cash(evt) {
    this.gateway = false;
    this.direct = false;
    this.cod = true;
  }

  DirectPayment() {
    let status;
    let data: DirectPaymentModel;
    data = this.placeOrderForm.value;
    data.orderid = this.orderId;
    this.Checkout.DirectPayment(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      if (status === 'Order Placed') {
        this._route.navigate(['order/PENDING']);
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
