import type { OrderStatus } from "../../types/order";

const STATUS_STYLES: Record<OrderStatus, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
    {status}
  </span>
);