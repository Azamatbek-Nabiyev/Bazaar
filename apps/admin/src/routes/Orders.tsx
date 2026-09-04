import { useState } from "react";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/orders/StatusBadge";
import { StatusFilterTabs, type FilterValue } from "../components/orders/StatusFilterTabs";
import { OrderDetailModal } from "../components/orders/OrderDetailModal";
import type { OrderStatusFormData } from "../components/orders/OrderStatusForm";
import { useGetOrdersQuery } from "../store/api";
import type { Order } from "../types/order";

export default function Orders() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery();

  const [filter, setFilter] = useState<FilterValue>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const columns = [
    {
      header: "Order ID",
      accessor: (row: Order) => (
        <span className="font-mono text-xs text-neutral-600">
          {row._id.slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Customer",
      accessor: (row: Order) => row.user?.fullname ?? "-",
    },
    {
      header: "Total",
      accessor: (row: Order) => `$${row.totalPrice.toFixed(2)}`,
    },
    {
      header: "Payment",
      accessor: (row: Order) => (
        <span className="capitalize text-neutral-600">{row.paymentStatus}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: Order) => <StatusBadge status={row.status} />,
    },
  ];

  const handleStatusUpdate = (data: OrderStatusFormData) => {
    if (!selectedOrder) return;
    // TODO: useUpdateOrderStatusMutation() bilan almashtiriladi
    console.log("Update order status:", selectedOrder._id, data);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load orders. {(error as any)?.status ?? ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
        <p className="text-sm text-neutral-500 mt-1">
          View and manage customer orders.
        </p>
      </div>

      <StatusFilterTabs active={filter} onChange={setFilter} />

      <DataTable
        columns={columns}
        data={filteredOrders}
        getRowId={(row) => row._id}
        emptyMessage="No orders found."
        actions={(row) => (
          <button
            onClick={() => setSelectedOrder(row)}
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            View
          </button>
        )}
      />

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}