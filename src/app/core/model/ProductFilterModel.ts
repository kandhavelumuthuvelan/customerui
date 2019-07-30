export interface ProductFilterModel {
  id: string;
  name: string;
  cost: string;
  cutcost: string;
  quantity: number;
  category: string;
  imageUrl: string;
  seller: string;
  shippingCost: number;
  delivery: number;
}
export interface ProductFilterPagingModel {
  source: string;
  area: string;
  key: string;
  page: number;
}
export interface ProductFilterAreaPagingModel {
  key: string;
  area: string;
  page: number;
  source: string;
}
export interface FilterSectorModel {
  id: string;
  name: string;
  cost: string;
  cutcost: string;
  quantity: number;
  category: string;
  imageUrl: string;
}

export interface AreaModel {
  id: string;
  location: string;
}

export interface EmitFilterModel {
  key: string;
  source: string;
}

