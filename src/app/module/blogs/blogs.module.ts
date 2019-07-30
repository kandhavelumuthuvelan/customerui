import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogService } from './../../core/services/BlogService';
import { BlogBusinees } from './../../core/Business/BlogBusinees';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs/blogs.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BlogsRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [BlogsComponent],
  providers: [BlogBusinees, BlogService]
})
export class BlogsModule { }
