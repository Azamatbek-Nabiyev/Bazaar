import type { OrderStatus } from "../../types/order";

const styles = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const labels = {
  pending: "PENDING",
  preparing: "PREPARING",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
};

export const StatusBadge = ({
  status,
}: {
  status: OrderStatus;
}) => {
  return (
    <span
      className={`text-[11px] font-semibold px-3 py-1 rounded ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};