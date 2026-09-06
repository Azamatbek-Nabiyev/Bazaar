import { useState } from "react";
import { DataTable } from "../components/ui/DataTable";
import { Pagination } from "../components/ui/Pagination";
import { StatusBadge } from "../components/orders/StatusBadge";
import { StatusFilterTabs, type FilterValue } from "../components/orders/StatusFilterTabs";
import { OrderDetailModal } from "../components/orders/OrderDetailModal";
import type { OrderStatusFormData } from "../components/orders/OrderStatusForm";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../store/api";
import type { Order } from "../types/order";

const PAGE_SIZE = 10;

export default function Orders() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterValue>("All");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery({
    page,
    limit: PAGE_SIZE,
    status: filter === "All" ? undefined : filter,
  });

  const orders = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statusError, setStatusError] = useState("");

  const handleFilterChange = (value: FilterValue) => {
    setFilter(value);
    setPage(1);
  };

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

  const handleStatusUpdate = async (data: OrderStatusFormData) => {
    if (!selectedOrder) return;
    setStatusError("");
    try {
      await updateOrderStatus({ id: selectedOrder._id, status: data.status }).unwrap();
      setSelectedOrder(null);
    } catch (err: any) {
      setStatusError(err?.data?.message || "Statusni yangilashda xatolik yuz berdi");
    }
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

      <StatusFilterTabs active={filter} onChange={handleFilterChange} />

      <DataTable
        columns={columns}
        data={orders}
        getRowId={(row) => row._id}
        emptyMessage="No orders found."
        actions={(row) => (
          <button
            onClick={() => {
              setStatusError("");
              setSelectedOrder(row);
            }}
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            View
          </button>
        )}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusUpdate={handleStatusUpdate}
        error={statusError}
      />
    </div>
  );
}