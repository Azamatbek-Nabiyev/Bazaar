export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";

export type OrderItem = {
  product: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    phone: string;
  };
  items: OrderItem[];
  shippingAddress: {
    city: string;
    address: string;
  };
  shippingPrice: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
};