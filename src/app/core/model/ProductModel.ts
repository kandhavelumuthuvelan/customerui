export interface ProductModel {
  id: string;
  name: string;
  cost: string;
  cutcost: string;
  quantity: number;
  category: string;
  imageUrl: string;
  sellerName: string;
  shippingCost: number;
  delivery: number;
}

export interface ProductImage {
  fileUrl: string;
}
export interface ProductLocation {
  location: string;
}
