import type { OrderStatus } from "./order";

export type RevenuePoint = {
  date: string;
  revenue: number;
};

export type TopProductStat = {
  _id: string;
  title: string;
  sold: number;
  revenue: number;
};

export type LowStockProduct = {
  _id: string;
  title: string;
  image: string;
  stock: number;
};

export type RecentOrder = {
  _id: string;
  user: { _id: string; fullname: string; phone: string } | null;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
};

export type DashboardSummary = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: RecentOrder[];
  lowStockProducts: LowStockProduct[];
  revenueOverTime: RevenuePoint[];
  topProducts: TopProductStat[];
};
