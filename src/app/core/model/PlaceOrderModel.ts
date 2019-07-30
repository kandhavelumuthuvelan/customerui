export interface PlaceOrderModel {
    shippingaddressid: string;
    billingaddressid: string;
    mid: string;
    channelid: string;
    industrytypeid: string;
    website: string;
    custid: string;
    orderid: string;
    txnamount: string;
    callbackurl: string;
    checksum: string;
    paytmurl: string;
    mobileno: string;
    email: string;
}


export interface DirectPaymentModel {
    orderid: string;
}
