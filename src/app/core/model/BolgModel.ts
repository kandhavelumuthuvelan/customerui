export interface BolgModel {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    img: string;
    createdDate: string;
}

export interface BolgCommentModel {
    blogId: string;
    name: string;
    email: string;
    comments: string;
    createdDate: Date;
    page: number;
}

export interface AddBolgCommentModel {
    blogId: string;
    name: string;
    email: string;
    comments: string;
}

export interface BolgCommentPagingModel {
    blogId: string;
    page: number;
}
