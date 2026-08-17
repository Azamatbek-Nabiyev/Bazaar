import React from 'react';

const styles = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
};

const labels = {
  delivered: 'DELIVERED',
  shipped: 'SHIPPED',
};

export const StatusBadge = ({ status }) => {
  return (
    <span className={`text-[11px] font-semibold px-3 py-1 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};