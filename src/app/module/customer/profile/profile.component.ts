import { PasswordValidation } from './password.validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { profilePasswordModel } from './../../../core/model/profilePasswordModel';
import { ProfileAddressModel } from '../../../core/model/ProfileAddressModel';
import { ProfileInfoModel } from './../../../core/model/profileInfoModel';
import { ProfileBusiness } from './../../../core/Business/ProfileBusiness';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  profileInfo: ProfileInfoModel;
  profileAddress: ProfileAddressModel;
  profilePassword: profilePasswordModel;

  profileInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  addressForm: FormGroup;

  public IsprofileInfoformSubmit: boolean;
  public IsaddressformSubmit: boolean;
  public IschangePasswordSubmit: boolean;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private CustomerProfile: ProfileBusiness,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Your Profile');
    this.profileInfoForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*')
      ])],
      email: [{ value: '', disabled: true }, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      mobile: [{ value: '', disabled: true }, Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required
      ])]
    });



    this.IsprofileInfoformSubmit = false;

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
    this.IsaddressformSubmit = false;

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
      ])],
      confirmNewPassword: ['', Validators.compose([Validators.required])]
    }, {
        validator: PasswordValidation.MatchPassword

      });


    this.IschangePasswordSubmit = false;

    this.GetCustomerProfile();
  }

  GetCustomerProfile() {
    if (!this.profileInfo) {
      this.CustomerProfile.GetCustomerProfile().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        this.profileInfo = x;

        this.profileInfoForm.patchValue({
          name: this.profileInfo.name,
          email: this.profileInfo.email,
          mobile: this.profileInfo.mobile,
        });
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  onProfileInfoSubmit(): void {
    let status;
    this.IsprofileInfoformSubmit = true;
    if (this.profileInfoForm.valid) {
      this.CustomerProfile.UpdateCustomerProfile(this.profileInfoForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        this.toastr.successToastr(status);
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  GetCustomerAddress() {
    if (!this.profileAddress) {
      this.CustomerProfile.GetCustomerAddress().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        if (x) {
          this.profileAddress = x;
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
        }
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  onAddressSubmit(): void {
    let status;
    this.IsaddressformSubmit = true;
    if (this.addressForm.valid) {
      this.CustomerProfile.UpdateCustomerAddress(this.addressForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        this.toastr.successToastr(status);
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  onchangePasswordSubmit(): void {
    let status;
    this.IschangePasswordSubmit = true;
    if (this.changePasswordForm.valid) {
      this.CustomerProfile.UpdateCustomerPassword(this.changePasswordForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        if (status === 'Password Updated Successfully') {
          this.toastr.successToastr(status);
        } else {
          this.toastr.errorToastr('Check Current Password');
        }
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  get profileInfoFormControls() {
    return this.profileInfoForm.controls;
  }

  get addressFormControls() {
    return this.addressForm.controls;
  }

  get changePasswordFormControls() {
    return this.changePasswordForm.controls;
  }
  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
