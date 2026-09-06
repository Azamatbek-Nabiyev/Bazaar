import type { OrderStatus } from "../../types/order";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[status]}`}>
    {status}
  </span>
);
