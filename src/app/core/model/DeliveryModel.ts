export interface DeliveryModel {
    id: string;
    orderProductId: string;
    confirmed: number;
    dispatched: boolean;
    dispatchedMsg: string;
    arrived: boolean;
    arrivedMsg: string;
    outfordelivery: boolean;
    outfordeliveryMsg: string;
    delivered: boolean;
    deliveredMsg: string;
    deliverStatus: number;
    createdDate: string;
}
