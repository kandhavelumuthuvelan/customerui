import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginBusiness } from './../../../core/Business/LoginBusiness';
import { BolgModel, BolgCommentModel, BolgCommentPagingModel, AddBolgCommentModel } from './../../../core/model/BolgModel';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogBusinees } from './../../../core/Business/BlogBusinees';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDetail } from 'src/app/core/model';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  providers: [DatePipe]
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  myDate = new Date();
  id: string;
  LoggedInUserDetails: UserDetail;
  LoggedInUser: string;
  Page = 1;
  blog: BolgModel;
  blogComment: BolgCommentModel[] = [];
  BlogCommentForm: FormGroup;
  public IsformSubmit: boolean;
  constructor(
    private fb: FormBuilder,
    private loggedUser: LoginBusiness,
    private meta: Meta,
    private titleService: Title,
    private Businees: BlogBusinees,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.loggedUser.getLoggedInUserID
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(x => {
        this.LoggedInUser = x;
      });

  }

  ngOnInit() {
    this.BlogCommentForm = this.fb.group({
      comment: ['', Validators.compose([
        Validators.maxLength(250),
        Validators.required
      ])],
    });
    this.GetBlogDetail();
    this.GetBlogComment();
  }

  GetBlogDetail() {
    this.Businees.GetBlogDetail(this.id).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.blog = x;
      this.titleService.setTitle(this.blog.title);
      this.meta.updateTag({ name: 'Description', content: this.blog.title + ' | DooyD.com' });
    });
  }

  GetBlogComment() {
    if (!this.blogComment || this.blogComment.length === 0) {
      this.GetBlogCommentScroll();
    }
  }

  GetBlogCommentScroll() {
    const data: BolgCommentPagingModel = { blogId: this.id, page: this.Page };
    this.Businees.GetBlogComment(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.blogComment.push(item);
        });
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  AddBlogComment() {
    if (this.BlogCommentForm.valid) {
      this.IsformSubmit = true;
      if (this.LoggedInUser) {
        this.LoggedInUserDetails = this.loggedUser.getLoggedInUserDetail();
        const data: AddBolgCommentModel = {
          blogId: this.id, name: this.LoggedInUserDetails.name,
          email: this.LoggedInUserDetails.email, comments: this.BlogCommentForm.value.comment
        };
        this.Businees.AddBlogComment(data).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
          const adddata: BolgCommentModel = {
            blogId: this.id, name: this.LoggedInUserDetails.name,
            email: this.LoggedInUserDetails.email, comments: this.BlogCommentForm.value.comment,
            createdDate: new Date(), page: this.Page
          };
          this.blogComment.splice(0, 0, adddata);
          this.BlogCommentForm.reset();
          this.toastr.successToastr(x);
        }, (error) => {
          this.toastr.errorToastr('Something went wrong!');
        });
      } else {
        $('#login-modal').modal('show');
      }
    }
  }

  LoadMore() {
    this.Page = this.Page + 1;
    this.GetBlogCommentScroll();
  }

  onShare(media: string) {
    const x = screen.width / 2 - 700 / 2;
    const y = screen.height / 2 - 450 / 2;
    window.open(media + 'blog-detail/' + this.id, this.blog.title,
      'toolbar=0, status=0, width=700, height=485,left=' + x + ',top=' + y + '');
  }

  get BlogCommentFormControls() {
    return this.BlogCommentForm.controls;
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
