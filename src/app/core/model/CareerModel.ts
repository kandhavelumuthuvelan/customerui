export interface CareerModel {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    isactive: boolean;
    createdDate: string;
}

export interface CareerApplyModel {
    careerId: string;
    name: string;
    email: string;
    mobile: string;
    website: boolean;
    comments: string;
    createdDate: string;
}
