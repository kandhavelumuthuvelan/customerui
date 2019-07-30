import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogBusinees } from './../../core/Business/BlogBusinees';
import { BlogService } from './../../core/services/BlogService';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BlogDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  declarations: [BlogDetailComponent],
  providers: [BlogBusinees, BlogService]
})
export class BlogDetailModule { }
