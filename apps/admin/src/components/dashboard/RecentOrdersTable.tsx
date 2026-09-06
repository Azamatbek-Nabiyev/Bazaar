import { Link } from "react-router-dom";
import { StatusBadge } from "../orders/StatusBadge";
import type { OrderStatus } from "../../types/order";

type RecentOrderDisplay = {
  id: string;
  customer: string;
  total: string;
  status: OrderStatus;
};

export const RecentOrdersTable = ({ orders }: { orders: RecentOrderDisplay[] }) => (
  <div className="bg-white border border-neutral-200 rounded-xl p-6">
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-bold text-neutral-900">Recent Orders</h2>
      <Link to="/orders" className="text-sm font-medium text-orange-600 hover:underline">
        View all
      </Link>
    </div>

    {orders.length === 0 ? (
      <p className="text-sm text-neutral-400">No orders yet.</p>
    ) : (
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-400 border-b border-neutral-100">
            <th className="font-medium py-2">Order ID</th>
            <th className="font-medium py-2">Customer</th>
            <th className="font-medium py-2">Total</th>
            <th className="font-medium py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-neutral-50 last:border-0">
              <td className="py-3 font-medium text-neutral-800 font-mono text-xs">{order.id}</td>
              <td className="py-3 text-neutral-600">{order.customer}</td>
              <td className="py-3 text-neutral-800">{order.total}</td>
              <td className="py-3">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);