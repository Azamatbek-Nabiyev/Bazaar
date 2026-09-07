import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge';
import { useGetMyOrdersQuery } from '../../store/api';
import { getImageUrl } from '../../utils/getImageUrl';
import { formatPrice } from '../../utils/formatPrice';

export const OrderHistory = () => {
  const { t } = useTranslation('profile');

  const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  const orders = data?.data || [];

  if (isLoading) {
    return <div>{t('orders.loading')}</div>;
  }

  if (isError) {
    return <div>{t('orders.error')}</div>;
  }

  if (!orders.length) {
    return (
      <div>
        <h2 className="font-bold mb-4">{t('orders.title')}</h2>

        <div className="border rounded-lg p-8 text-center text-gray-500">
          {t('orders.empty')}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold mb-4">{t('orders.title')}</h2>

      <div className="border rounded-lg divide-y">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img
                  src={getImageUrl(order.items[0].image)}
                  alt={order._id}
                  className="w-14 h-14 rounded object-cover bg-gray-100"
                />

                <div>
                  <div className="font-semibold text-sm">
                    #{order._id}
                  </div>

                  <div className="text-xs text-gray-400">
                    {t('orders.itemsCount', { count: order.items?.length || 0 })}
                  </div>
                </div>
              </div>

              <StatusBadge status={order.status} />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {formatPrice(order.totalPrice)} so'm
              </span>

              <div className="flex items-center gap-3">
                <button className="text-xs border rounded-full px-4 py-2">
                  {t('orders.trackOrder')}
                </button>

                <button className="text-xs flex items-center gap-1 text-gray-600">
                  {t('orders.details')}
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