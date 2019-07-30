export interface WishlistModel {
  id: string;
  productid: string;
  name: string;
  cost: number;
  cutcost: number;
  quantity: number;
  imageUrl: string;
}

export interface WishlistViewModel {
  id: string;
  customerId: string;
}
