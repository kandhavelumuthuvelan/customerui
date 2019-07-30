export class InvoiceDetail {
  id: string;
  customerName: string;
  customerProperty: string;
  customerStreet: string;
  customerAddressDetail: string;
  sellerName: string;
  sellerProperty: string;
  sellerStreet: string;
  sellerAddressDetail: string;
  invoiceDate: Date;
  productName: string;
  productQuantity: number;
  productCost: number;
  subTotal: number;
  total: number;
  fromDate: string;
  toDate: string;
  dayCount: number;
  invoiceNo: string;
  orderId: string;
  type: number;
}
