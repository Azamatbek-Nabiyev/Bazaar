import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockPaymentMethods } from './mockData';

export const PaymentMethods = () => {
  const [methods, setMethods] = useState(mockPaymentMethods);

  const handleRemove = (id) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">Payment Methods</h2>
        <button className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2.5 rounded-lg">
          <Plus size={14} /> Add Card
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {methods.map((method) => (
          <div key={method.id} className={`border rounded-lg p-4 flex items-center justify-between ${method.isDefault ? 'bg-gray-50' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="bg-black text-white text-[10px] font-bold px-2 py-3 rounded w-14 text-center uppercase">
                {method.brand}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  {method.brand} •••• {method.last4}
                  {method.isDefault && <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded">DEFAULT</span>}
                </div>
                <div className="text-xs text-gray-400">Expires {method.expires}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded"><Pencil size={15} /></button>
              <button onClick={() => handleRemove(method.id)} className="p-2 bg-orange-50 text-orange-600 rounded">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};