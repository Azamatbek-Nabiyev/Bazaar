import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useGetMyOrdersQuery } from '../../store/api';

export const OrderHistory = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  const orders = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load orders</div>;
  }

  if (!orders.length) {
    return (
      <div>
        <h2 className="font-bold mb-4">Order History</h2>

        <div className="border rounded-lg p-8 text-center text-gray-500">
          You don't have any orders yet.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold mb-4">Order History</h2>

      <div className="border rounded-lg divide-y">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img
                  src={order.items[0].image}
                  alt={order._id}
                  className="w-14 h-14 rounded object-cover bg-gray-100"
                />

                <div>
                  <div className="font-semibold text-sm">
                    #{order._id}
                  </div>

                  <div className="text-xs text-gray-400">
                    {order.items?.length || 0}{' '}
                    {order.items?.length === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>

              <StatusBadge status={order.status} />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">
                ${order.totalPrice}
              </span>

              <div className="flex items-center gap-3">
                <button className="text-xs border rounded-full px-4 py-2">
                  Track Order
                </button>

                <button className="text-xs flex items-center gap-1 text-gray-600">
                  Details
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};