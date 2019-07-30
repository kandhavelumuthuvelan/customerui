import { ProductDetail } from './ProductDetail';
export interface ChatModel {
  id: string;
  productDetail: ProductDetail;
  createdDate: Date;
  chatDetail: ChatDetail[];
  sellerName: string;
  userGuid: string;
  isOnline: boolean;
  hasUnReadMsg: boolean;
}
export interface ChatDetail {
  message: string;
  isCustomer: boolean;
  createdDate: Date;
  isRead: boolean;
  chatId: string;
}

export interface ChatMessage {
  message: string;
  productId: string;
}

export interface OnlineHistory {
  userId: string;
  isOnline: boolean;
}
