import { ProductImage, ProductLocation } from './ProductModel';

export interface ProductDetail {
  id: string;
  sellerId: string;
  name: string;
  sellerName: string;
  isAvailable: boolean;
  description: string;
  shortDescription: string;
  category: string;
  maxQuantity: number;
  price: number;
  cutPrice: number;
  capability: number;
  shippingCost: number;
  delivery: number;
  productImage: ProductImage[];
  productSupplyLocation: ProductLocation[];
}

export interface ProductMupModel {
  productId: string;
  sellerId: string;
  quantity: number;
  fromDate: string;
  toDate: string;
  description: string;
}

export interface AddReviewCommentModel {
  productId: string;
  name: string;
  rating: number;
  comments: string;
}


export interface ReviewCommentModel {
  productId: string;
  name: string;
  rating: number;
  comments: string;
  createdDate: Date;
}

export interface ReviewCommentPagingModel {
  productId: string;
  page: number;
}
