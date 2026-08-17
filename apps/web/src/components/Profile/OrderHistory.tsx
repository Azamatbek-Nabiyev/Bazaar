import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { mockOrders } from './mockData';

export const OrderHistory = () => {
  return (
    <div>
      <h2 className="font-bold mb-4">Order History</h2>

      <div className="border rounded-lg divide-y">
        {mockOrders.map((order) => (
          <div key={order.id} className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img src={order.image} alt={order.id} className="w-14 h-14 rounded object-cover bg-gray-100" />
                <div>
                  <div className="font-semibold text-sm">{order.id}</div>
                  <div className="text-xs text-gray-400">
                    {order.date} · {order.itemsCount} item{order.itemsCount > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">${order.total}</span>
              <div className="flex items-center gap-3">
                <button className="text-xs border rounded-full px-4 py-2">Track Order</button>
                <button className="text-xs flex items-center gap-1 text-gray-600">
                  Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};