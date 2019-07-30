import { ForgotPasswordModel } from './../../../core/model/ForgotPasswordModel';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ResetPasswordBusiness } from 'src/app/core/Business/ResetPasswordBusiness';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  public IsformSubmit: boolean;
  forgotForm: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private Business: ResetPasswordBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) { }

  ngOnInit() {
    $('#login-modal').modal('hide');
    $('#register-modal').modal('hide');
    this.titleService.setTitle('Forgot Password');
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }

  onForgotPasswordSubmit(): void {
    let status;
    this.IsformSubmit = true;
    if (this.forgotForm.valid) {
      let model: ForgotPasswordModel;
      model = this.forgotForm.value;
      model.type = 1;
      model.email = this.forgotForm.value.email;
      this.Business.FotgotPassword(this.forgotForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        if (status === 'Email not found. Make  sure your email!') {
          this.toastr.warningToastr('Email not found. Make  sure your email!');
        } else {
          this.toastr.successToastr(status);
          this.forgotForm.reset();
          this._route.navigate(['/']);
        }
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  get forgotFormControls() {
    return this.forgotForm.controls;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
