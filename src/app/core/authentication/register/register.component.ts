import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterBusiness } from '../../Business/RegisterBusiness';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  registerForm: FormGroup;
  public IsformSubmit: boolean;

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(4),
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('[0-9]*')
      ])],
      email: ['', Validators.compose([
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
      ])]
    });
    this.IsformSubmit = false;
  }

  constructor(
    private fb: FormBuilder,
    private register: RegisterBusiness,
    public toastr: ToastrManager,
  ) { }

  onSubmit() {
    let status;
    this.IsformSubmit = true;
    if (this.registerForm.valid) {
      this.register.InsertCustomerProfile(this.registerForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        status = x;
        if (status === 'Registered successfully & Activation Mail sent to your mail') {
          this.loginNow();
          this.toastr.successToastr(status);
          this.registerForm.reset();
        } else {
          if (status === 'Mobile/Email alredy exists') {
            this.toastr.warningToastr('Mobile/Email alredy exists');
          } else {
            this.toastr.errorToastr('Something went wrong!');
          }
        }
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  loginNow(): void {
    $('#login-modal').modal('show');
    $('#register-modal').modal('hide');
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
