export interface OrderModel {
  id: string;
  orderId: string;
  productid: string;
  name: string;
  cost: number;
  quantity: number;
  status: string;
  createddate: string;
  delivered: boolean;
  confirmed: number;
}

export interface OrderDetail {
  id: string;
  orderId: string;
  customerId: string;
  productId: string;
  productName: string;
  productCost: number;
  quantity: number;
  status: string;
  createdDate: string;
  delivered: boolean;
  confirmed: number;
  totalAmount: number;
  imageUrl: string;
  dayCount: number;
  fromDate: string;
  toDate: string;
  type: number;
}

// export class OrderModelObj implements OrderModel {

//     id: string;
//     productid: string;
//     name: string;
//     cost: number;
//     quantity: number;
//     status: string;
//     createddate: string;

//     constructor(item?: OrderModel) {
//         if (item !== undefined) {
//             for (let key in item) {
//                 this[key] = item[key];
//             }
//         }
//     }
// }
