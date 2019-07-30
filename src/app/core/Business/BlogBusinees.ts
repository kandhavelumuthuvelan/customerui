import { BolgModel, BolgCommentModel, BolgCommentPagingModel, AddBolgCommentModel } from './../model/BolgModel';
import { BlogService } from './../services/BlogService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BlogBusinees {
    constructor(private service: BlogService) { }

    GetBlog(page: number): Observable<BolgModel[]> {
        return this.service.post(`Blog/GetBlog/${page}`);
    }

    GetBlogDetail(id: string): Observable<BolgModel> {
        return this.service.get<BolgModel>(`Blog/GetBlogDetail/${id}`);
    }

    GetBlogComment(data: BolgCommentPagingModel): Observable<BolgCommentModel[]> {
        return this.service.post('Blog/GetBlogComment', (data));
    }

    AddBlogComment(data: AddBolgCommentModel): Observable<any> {
        return this.service.post<any>('Blog/AddBlogComment', (data));
    }
}
