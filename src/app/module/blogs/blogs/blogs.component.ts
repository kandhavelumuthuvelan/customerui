import { BlogBusinees } from './../../../core/Business/BlogBusinees';
import { BolgModel } from './../../../core/model/BolgModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  Blogs: BolgModel[] = [];
  Page = 1;
  PageSize = 8;
  DubPageBlog = 1;
  constructor(
    private titleService: Title,
    private Businees: BlogBusinees,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Blogs');
    this.GetBlog();
  }

  GetBlog() {
    if (!this.Blogs || this.Blogs.length === 0) {
      this.GetBlogScroll();
    }
  }

  GetBlogScroll() {
    this.Businees.GetBlog(this.Page).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      if (x !== undefined) {
        x.forEach(item => {
          this.Blogs.push(item);
        });
      }
    }, error => {
      this.toastr.errorToastr('Something went wrong!');
    }
    );
  }

  LoadMore() {
    this.Page = Number((this.Blogs.length / this.PageSize).toFixed()) + 1;
    if (this.Page > this.DubPageBlog) {
      this.GetBlogScroll();
      this.DubPageBlog = this.Page;
    }
  }


  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
