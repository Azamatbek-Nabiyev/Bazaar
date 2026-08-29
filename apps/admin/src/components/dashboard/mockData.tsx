import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  type LucideIcon,
} from "lucide-react";

export type Stat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export const STATS: Stat[] = [
  {
    label: "Total Revenue",
    value: "$48,290",
    change: "+12.4%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.1%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    label: "New Customers",
    value: "342",
    change: "-2.3%",
    trend: "down",
    icon: Users,
  },
  {
    label: "Products in Stock",
    value: "2,150",
    change: "+4.6%",
    trend: "up",
    icon: Package,
  },
];

export type SalesPoint = { day: string; revenue: number };

export const SALES_DATA: SalesPoint[] = [
  { day: "Mon", revenue: 3200 },
  { day: "Tue", revenue: 4100 },
  { day: "Wed", revenue: 3800 },
  { day: "Thu", revenue: 5200 },
  { day: "Fri", revenue: 6100 },
  { day: "Sat", revenue: 7400 },
  { day: "Sun", revenue: 5900 },
];

export type OrderStatus = "Delivered" | "Processing" | "Shipped" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  total: string;
  status: OrderStatus;
};

export const RECENT_ORDERS: Order[] = [
  { id: "#BZ1042", customer: "Alisher Karimov", total: "$128.00", status: "Delivered" },
  { id: "#BZ1041", customer: "Dilnoza Yusupova", total: "$76.50", status: "Processing" },
  { id: "#BZ1040", customer: "Javlon Rustamov", total: "$243.00", status: "Shipped" },
  { id: "#BZ1039", customer: "Malika Nosirova", total: "$59.99", status: "Delivered" },
  { id: "#BZ1038", customer: "Botir Ergashev", total: "$310.00", status: "Cancelled" },
];

export type TopProduct = { name: string; sold: number; revenue: string };

export const TOP_PRODUCTS: TopProduct[] = [
  { name: "Classic Denim Jacket", sold: 214, revenue: "$8,988" },
  { name: "Leather Crossbody Bag", sold: 178, revenue: "$7,120" },
  { name: "Minimalist Sneakers", sold: 156, revenue: "$6,240" },
  { name: "Wool Blend Coat", sold: 102, revenue: "$9,180" },
];