import { StatCard } from "../components/dashboard/StatCard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { TopProducts } from "../components/dashboard/TopProducts";
import { RecentOrdersTable } from "../components/dashboard/RecentOrdersTable";
import { STATS, SALES_DATA, RECENT_ORDERS, TOP_PRODUCTS } from "../components/dashboard/mockData";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Welcome back, here's what's happening with Bazaar today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={SALES_DATA} />
        <TopProducts products={TOP_PRODUCTS} />
      </div>

      <RecentOrdersTable orders={RECENT_ORDERS} />
    </div>
  );
}