import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginBusiness } from '../../Business/LoginBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginModel } from '../../model';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  loginForm: FormGroup;
  leadForm: FormGroup;
  public IsformSubmit: boolean;
  public IsLeadformSubmit: boolean;
  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.maxLength(40),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(40),
        Validators.required
      ])]
    });

    this.leadForm = this.fb.group({
      details: ['', Validators.compose([
        Validators.maxLength(250),
        Validators.required
      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.required
      ])]
    });
    this.IsformSubmit = false;
    this.IsLeadformSubmit = false;
  }

  constructor(
    private fb: FormBuilder,
    private login: LoginBusiness,
    public toastr: ToastrManager
  ) { }

  onSubmit() {
    this.IsformSubmit = true;
    if (this.loginForm.valid) {
      let login: LoginModel;
      login = this.loginForm.value;
      login.userType = 1;
      this.login.CheckIfUserIsValid(login).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        this.loginForm.reset();
      },
        error => {
          if (error === 'Your account is not verified check your mail to activate') {
            this.toastr.warningToastr('Your account is not verified check you mail to activate!');
          } else {
            this.toastr.errorToastr(error);
          }
        }
      );
    }
  }

  onLeadSubmit() {
    this.IsLeadformSubmit = true;
    if (this.leadForm.valid) {
      this.login.InsertInboundLead(this.leadForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        $('.supplier-modal').modal('hide');
        this.leadForm.reset();
        this.toastr.successToastr(x);
      },
        error => {
          this.toastr.errorToastr('Something went wrong!');
        }
      );
    }
  }

  Cancel(): void {
    $('.supplier-modal').modal('hide');
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  get leadFormControls() {
    return this.leadForm.controls;
  }

  registerNow(): void {
    $('#login-modal').modal('hide');
    $('#register-modal').modal('show');
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
