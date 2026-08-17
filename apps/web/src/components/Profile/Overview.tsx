import React from 'react';
import { ShoppingBag, TrendingUp, Heart, Star } from 'lucide-react';
import { StatCard } from './StatCard';
import { StatusBadge } from './StatusBadge';
import { mockUser, mockOrders } from './mockData';

export const Overview = () => {
  const recentOrders = mockOrders.slice(0, 3);
  const progressPercent = Math.round((mockUser.totalSpent / mockUser.nextTierAt) * 100);
  const remaining = mockUser.nextTierAt - mockUser.totalSpent;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<ShoppingBag size={20} />} value={mockUser.totalOrders} label="Total Orders" />
        <StatCard icon={<TrendingUp size={20} />} value={`$${mockUser.totalSpent.toLocaleString()}`} label="Total Spent" />
        <StatCard icon={<Heart size={20} />} value={mockUser.savedItems} label="Saved Items" />
      </div>

      <div className="border rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-amber-200 flex items-center justify-center">
            <Star size={22} className="fill-white text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase">Membership Status</div>
            <div className="text-lg font-bold">{mockUser.tier}</div>
            <div className="text-sm text-gray-500">
              Member since {mockUser.memberSince} · Enjoy exclusive Gold benefits
            </div>
          </div>
        </div>

        <div className="w-48">
          <div className="text-xs text-gray-500 text-right mb-1">
            Next tier at ${mockUser.nextTierAt.toLocaleString()}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="text-xs text-gray-400 text-right mt-1">
            ${remaining.toLocaleString()} to Platinum
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Recent Orders</h2>
          <button className="text-sm text-orange-600">View all</button>
        </div>

        <div className="border rounded-lg divide-y">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-4">
              <img src={order.image} alt={order.id} className="w-12 h-12 rounded object-cover bg-gray-100" />
              <div className="flex-1">
                <div className="font-medium text-sm">{order.id}</div>
                <div className="text-xs text-gray-400">{order.date} · {order.itemsCount} items</div>
              </div>
              <StatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};