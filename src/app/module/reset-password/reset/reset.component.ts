import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResetPasswordModel } from './../../../core/model/ResetPasswordModel';
import { PasswordValidation } from './../../customer/profile/password.validator';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ResetPasswordBusiness } from 'src/app/core/Business/ResetPasswordBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  id: string;

  resetForm: FormGroup;

  public IsresetFormSubmit: boolean;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private Business: ResetPasswordBusiness,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private _route: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {


    this.titleService.setTitle('Password Reset');
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
      ])],
      confirmNewPassword: ['', Validators.compose([Validators.required])]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  onResetPasswordSubmit(): void {
    let status;
    this.IsresetFormSubmit = true;
    if (this.resetForm.valid) {
      let Reset: ResetPasswordModel;
      Reset = this.resetForm.value;
      Reset.Id = this.id;
      this.Business.ResetPassword(Reset).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        if (status === 'Not a valid Password Reset!') {
          this.toastr.warningToastr('Not a valid Password Reset!');
        } else {
          this.toastr.successToastr(status);
          this.resetForm.reset();
          this._route.navigate(['/']);
        }
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  get resetPasswordFormControls() {
    return this.resetForm.controls;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
