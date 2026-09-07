import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { TopProducts } from "../components/dashboard/TopProducts";
import { LowStockProducts } from "../components/dashboard/LowStockProducts";
import { RecentOrdersTable } from "../components/dashboard/RecentOrdersTable";
import { useGetDashboardSummaryQuery } from "../store/api";
import { formatPrice } from "../utils/formatPrice";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Dashboard() {
  const { data, isLoading, isError, error } = useGetDashboardSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load dashboard. {(error as any)?.status ?? ""}
      </div>
    );
  }

  const stats = [
    {
      label: "Total Revenue",
      value: `${formatPrice(data.totalRevenue)} so'm`,
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: String(data.totalOrders),
      icon: ShoppingCart,
    },
    {
      label: "Total Products",
      value: String(data.totalProducts),
      icon: Package,
    },
    {
      label: "Total Customers",
      value: String(data.totalUsers),
      icon: Users,
    },
  ];

  const revenueChartData = data.revenueOverTime.map((point) => ({
    day: WEEKDAY_LABELS[new Date(point.date).getDay()],
    revenue: point.revenue,
  }));

  const topProducts = data.topProducts.map((p) => ({
    name: p.title,
    sold: p.sold,
    revenue: `${formatPrice(p.revenue)} so'm`,
  }));

  const recentOrders = data.recentOrders.map((order) => ({
    id: order._id.slice(-8).toUpperCase(),
    customer: order.user?.fullname ?? "-",
    total: `${formatPrice(order.totalPrice)} so'm`,
    status: order.status,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Welcome back, here's what's happening with Bazaar today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={revenueChartData} />
        <TopProducts products={topProducts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={recentOrders} />
        </div>
        <LowStockProducts products={data.lowStockProducts} />
      </div>
    </div>
  );
}
