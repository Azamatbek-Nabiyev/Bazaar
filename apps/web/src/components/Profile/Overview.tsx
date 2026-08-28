import { ShoppingBag, Heart } from 'lucide-react';
import { StatCard } from './StatCard';
import { StatusBadge } from './StatusBadge';
import { useAppSelector } from '../../store/hooks';
import { selectSavedItems } from '../../store/savedItemsSlice';
import { useGetMyOrdersQuery } from '../../store/api';

export const Overview = () => {
   const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  const savedItems = useAppSelector(selectSavedItems);  

  const orders = data?.data.slice(0, 3) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load orders</div>;
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<ShoppingBag size={20} />} value={orders.length} label="Total Orders" />
        <StatCard icon={<Heart size={20} />} value={savedItems.length} label="Saved Items" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Recent Orders</h2>
          <button className="text-sm text-orange-600">View all</button>
        </div>

        <div className="border rounded-lg divide-y">
          {orders.map((order) => (
            <div key={order._id} className="flex items-center gap-4 p-4">
              <img src={order.items[0].image} alt={order._id} className="w-12 h-12 rounded object-cover bg-gray-100" />
              <div className="flex-1">
                <div className="font-medium text-sm">{order._id}</div>
                <div className="text-xs text-gray-400">{order.items.length} items</div>
              </div>
              <StatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};