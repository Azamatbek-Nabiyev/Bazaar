import { Modal } from "../ui/Modal";
import { StatusBadge } from "./StatusBadge";
import { OrderStatusForm, type OrderStatusFormData } from "./OrderStatusForm";
import type { OrderDetail } from "./mockData";

export const OrderDetailModal = ({
  order,
  onClose,
  onStatusUpdate,
}: {
  order: OrderDetail | null;
  onClose: () => void;
  onStatusUpdate: (data: OrderStatusFormData) => void;
}) => {
  if (!order) return null;

  return (
    <Modal open={!!order} title={`Order ${order.orderNumber}`} onClose={onClose}>
      <div className="flex flex-col gap-6">
        {/* Header info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Placed on {order.date}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Customer info */}
        <div className="grid grid-cols-2 gap-4 text-sm bg-neutral-50 rounded-lg p-4">
          <div>
            <p className="text-xs text-neutral-400 mb-0.5">Customer</p>
            <p className="font-medium text-neutral-800">{order.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-0.5">Phone</p>
            <p className="font-medium text-neutral-800">{order.customerPhone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-neutral-400 mb-0.5">Shipping Address</p>
            <p className="font-medium text-neutral-800">
              {order.shippingAddress}, {order.city}
            </p>
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-sm font-semibold text-neutral-800 mb-3">Items</p>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover object-top bg-neutral-100"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                  <p className="text-xs text-neutral-400">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-neutral-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-2 text-sm border-t border-neutral-100 pt-4">
          <div className="flex justify-between">
            <span className="text-neutral-500">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Shipping</span>
            <span>${order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-neutral-100">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Status update */}
        <div className="border-t border-neutral-100 pt-4">
          <p className="text-sm font-semibold text-neutral-800 mb-3">Update Status</p>
          <OrderStatusForm onSubmit={onStatusUpdate} defaultValues={{ status: order.status }} />
        </div>
      </div>
    </Modal>
  );
};