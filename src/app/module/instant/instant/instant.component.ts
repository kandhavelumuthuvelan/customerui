import { LoginBusiness } from 'src/app/core/Business/business';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstantBusiness } from 'src/app/core/Business/InstantBusiness';
import { KeyValue } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-instant',
  templateUrl: './instant.component.html',
  styleUrls: ['./instant.component.css']
})
export class InstantComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  LoggedInUser: string;
  public productCategories: KeyValue<string, string>[];
  public productDisciplines: KeyValue<string, string>[];
  public productSectors: KeyValue<string, string>[];

  instantForm: FormGroup;

  public IsinstantFormSubmit: boolean;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private loggedUser: LoginBusiness,
    private business: InstantBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) {
    this.loggedUser.getLoggedInUserID.pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.LoggedInUser = x;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Make Quote');
    this.instantForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required
      ])],
      quantity: ['', Validators.compose([
        Validators.maxLength(6),
        Validators.minLength(1),
        Validators.required,
        Validators.pattern('[0-9]*')
      ])],
      description: ['', Validators.compose([
        Validators.maxLength(250),
        Validators.minLength(25),
        Validators.required
      ])],
      productcategoryid: ['', Validators.required],
      productdisciplineid: ['', Validators.required],
      productsectorid: ['', Validators.required]
    });

    this.IsinstantFormSubmit = false;
    this.GetProductCategories();
  }

  GetProductCategories() {
    this.business.GetProductCategories().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.productCategories = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  OnSelectCategory(event) {
    this.GetProductDisciplines();
  }

  GetProductDisciplines() {
    this.business.GetProductDisciplines(this.instantForm.value.productcategoryid).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.productDisciplines = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  OnSelectDiscipline(event) {
    this.GetProductSectors();
  }

  GetProductSectors() {
    this.business.GetProductSectors(this.instantForm.value.productdisciplineid).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.productSectors = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  onSubmit(): void {
    let status;
    this.IsinstantFormSubmit = true;
    if (this.instantForm.valid) {
      if (this.LoggedInUser) {
        this.business.InsertInstantQuote(this.instantForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          status = x;
          this._route.navigate(['']);
          this.toastr.successToastr(status);
          this.instantForm.reset();
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      } else {
        $('#login-modal').modal('show');
      }
    }

  }

  get instantFormControls() {
    return this.instantForm.controls;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
