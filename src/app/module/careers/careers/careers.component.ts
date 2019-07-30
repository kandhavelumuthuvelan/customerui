import { CareerBusiness } from './../../../core/Business/CareerBusiness';
import { CareerModel } from './../../../core/model/CareerModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  Careers: CareerModel[] = [];
  Page = 1;

  constructor(
    private titleService: Title,
    private Businees: CareerBusiness,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Blogs');
    this.GetCareerScroll();
  }

  GetCareerScroll() {
    this.Businees.GetCareer(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.Careers.push(item);
        });
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  LoadMore() {
    this.Page = this.Page + 1;
    this.GetCareerScroll();
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
