export interface CartModel {
  id: string;
  productid: string;
  name: string;
  cost: number;
  cutcost: number;
  productquantity: number;
  quantity: number;
  imageUrl: string;
  dayCount: number;
  type: number;
  fromDate: string;
  toDate: string;
}

export interface CartViewModel {
  customerId: string;
  id: string;
  quantity: number;
}

export interface CartInsertModel {
  productId: string;
  fromDate: string;
  toDate: string;
}
