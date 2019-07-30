import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CareerModel, CareerApplyModel } from './../../../core/model/CareerModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CareerBusiness } from 'src/app/core/Business/CareerBusiness';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SeoService } from 'src/app/core/services/seo.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  myDate = new Date();
  id: string;
  CareerDetail: CareerModel = {
    id: '',
    title: '',
    shortDescription: '',
    description: '',
    isactive: true,
    createdDate: ''
  }
  CareerForm: FormGroup;
  public IsformSubmit: boolean;
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private Businees: CareerBusiness,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private seo: SeoService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.CareerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('[0-9]*')
      ])],
      website: ['', Validators.compose([
        Validators.maxLength(100),
      ])],
      comments: ['', Validators.compose([
        Validators.maxLength(250),
      ])],
    });
    this.GetCareerDetail();
  }

  GetCareerDetail() {
    this.Businees.GetCareerDetail(this.id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.CareerDetail = x;
      // this.titleService.setTitle(this.CareerDetail.title);
      this.seo.generateTags({
        title: this.CareerDetail.title,
        description: this.CareerDetail.title + ' | DooyD.com',
      });
    });
  }


  AddBlogComment() {
    if (this.CareerForm.valid) {
      this.IsformSubmit = true;
      let data: CareerApplyModel;
      data = this.CareerForm.value;
      data.careerId = this.id;

      this.Businees.CareerApply(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        this.CareerForm.reset();
        this.toastr.successToastr(x);
      }, (error) => {
        this.toastr.errorToastr('Something went wrong!');
      });
    }
  }

  get BlogCommentFormControls() {
    return this.CareerForm.controls;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
