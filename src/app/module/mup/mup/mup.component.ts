import { Router } from '@angular/router';
import { MupBusiness } from './../../../core/Business/MupBusiness';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MupModel } from 'src/app/core/model/MupModel';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mup',
  templateUrl: './mup.component.html',
  styleUrls: ['./mup.component.css']
})
export class MupComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  Mups: MupModel[];
  constructor(
    private titleService: Title,
    private business: MupBusiness,
    public toastr: ToastrManager,
    private _route: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Bulk / Custom Order requests');
    this.GetMupRequestCustomer();
  }

  GetMupRequestCustomer() {
    this.business.GetMupRequestCustomer().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.Mups = x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  deleteMupRequest(id: string): void {
    let status;
    this.business.DeleteMupRequest(id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      status = x;
      this.toastr.successToastr(status);
      this.GetMupRequestCustomer();
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  // ProceedToCheckout(id: string): void {
  //   this._route.navigate(['checkout/' + id]);
  // }

  addToCart(id: string): void {
    this.business.MoveToCart(id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.toastr.successToastr(x);
      this._route.navigate(['cart']);
    },
      error => {
        this.toastr.errorToastr('Something went wrong!');
      }
    );
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
