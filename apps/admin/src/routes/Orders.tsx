import { useState } from "react";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/orders/StatusBadge";
import { StatusFilterTabs, type FilterValue } from "../components/orders/StatusFilterTabs";
import { OrderDetailModal } from "../components/orders/OrderDetailModal";
import type { OrderStatusFormData } from "../components/orders/OrderStatusForm";
import { MOCK_ORDERS, type OrderDetail } from "../components/orders/mockData";

export default function Orders() {
  const [orders, setOrders] = useState<OrderDetail[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<FilterValue>("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const columns = [
    { header: "Order ID", accessor: "orderNumber" as const },
    { header: "Customer", accessor: "customerName" as const },
    { header: "Date", accessor: "date" as const },
    {
      header: "Total",
      accessor: (row: OrderDetail) => `$${row.total.toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: (row: OrderDetail) => <StatusBadge status={row.status} />,
    },
  ];

  const handleStatusUpdate = (data: OrderStatusFormData) => {
    if (!selectedOrder) return;
    // TODO: useUpdateOrderStatusMutation() bilan almashtiriladi
    setOrders((prev) =>
      prev.map((o) => (o._id === selectedOrder._id ? { ...o, status: data.status } : o))
    );
    setSelectedOrder(null);
  };

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