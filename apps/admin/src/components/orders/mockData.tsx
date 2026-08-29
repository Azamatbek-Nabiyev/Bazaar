export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

export type OrderDetail = {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export const MOCK_ORDERS: OrderDetail[] = [
  {
    _id: "1",
    orderNumber: "#BZ1042",
    customerName: "Alisher Karimov",
    customerPhone: "+998 90 123 45 67",
    shippingAddress: "Chilonzor 12-uy",
    city: "Tashkent",
    date: "2026-08-25",
    status: "Delivered",
    items: [
      { productId: "1", name: "Classic Denim Jacket", image: "/images/p1.jpg", quantity: 1, price: 89.99 },
      { productId: "2", name: "Leather Crossbody Bag", image: "/images/p2.jpg", quantity: 1, price: 38.01 },
    ],
    subtotal: 128.0,
    shipping: 0,
    total: 128.0,
  },
  {
    _id: "2",
    orderNumber: "#BZ1041",
    customerName: "Dilnoza Yusupova",
    customerPhone: "+998 90 234 56 78",
    shippingAddress: "Yunusobod 5-mavze",
    city: "Tashkent",
    date: "2026-08-26",
    status: "Processing",
    items: [
      { productId: "3", name: "Minimalist Sneakers", image: "/images/p3.jpg", quantity: 1, price: 76.5 },
    ],
    subtotal: 76.5,
    shipping: 0,
    total: 76.5,
  },
  {
    _id: "3",
    orderNumber: "#BZ1040",
    customerName: "Javlon Rustamov",
    customerPhone: "+998 90 345 67 89",
    shippingAddress: "Mirobod 8-uy",
    city: "Tashkent",
    date: "2026-08-27",
    status: "Shipped",
    items: [
      { productId: "4", name: "Wool Blend Coat", image: "/images/p4.jpg", quantity: 1, price: 213.0 },
      { productId: "1", name: "Classic Denim Jacket", image: "/images/p1.jpg", quantity: 1, price: 30.0 },
    ],
    subtotal: 243.0,
    shipping: 0,
    total: 243.0,
  },
  {
    _id: "4",
    orderNumber: "#BZ1038",
    customerName: "Botir Ergashev",
    customerPhone: "+998 90 456 78 90",
    shippingAddress: "Sergeli 3-uy",
    city: "Tashkent",
    date: "2026-08-24",
    status: "Cancelled",
    items: [
      { productId: "2", name: "Leather Crossbody Bag", image: "/images/p2.jpg", quantity: 2, price: 155.0 },
    ],
    subtotal: 310.0,
    shipping: 0,
    total: 310.0,
  },
];