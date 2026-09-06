export type Order = {
  _id: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  items: any[];
};

export type OrdersResponse = {
  status: string;
  total: number;
  data: Order[];
};

export type OrderStatus =
  | "pending"
  | "preparing"
  | "delivered"
  | "cancelled";

export type RequestOrder = {
  shippingAddress: {
    city: string,
    address: string
  },
  paymentMethod: string,
  items: RequestItem[]
}

type RequestItem = {
  product: string,
  quantity: number
}