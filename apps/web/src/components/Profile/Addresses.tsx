import React, { useState } from "react";
import { Plus, Pencil, Trash2, Check, MapPin } from "lucide-react";
import { mockAddresses } from "./mockData";

export const Addresses = () => {
  const [addresses, setAddresses] = useState(mockAddresses);

  const handleRemove = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">Saved Addresses</h2>
        <button className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2.5 rounded-lg">
          <Plus size={14} /> Add Address
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-lg p-5 flex items-start justify-between ${addr.isDefault ? "bg-gray-50" : ""}`}
          >
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center">
                <MapPin size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-semibold text-sm">
                  {addr.label}
                  {addr.isDefault && (
                    <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {addr.name}
                  <br />
                  {addr.line1}
                  <br />
                  {addr.city}
                  <br />
                  {addr.country}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-sm">
              <button className="flex items-center gap-1 text-gray-700">
                <Pencil size={13} /> Edit
              </button>
              {!addr.isDefault && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="flex items-center gap-1 text-gray-700"
                >
                  <Check size={13} /> Set default
                </button>
              )}
              <button
                onClick={() => handleRemove(addr.id)}
                className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1.5 rounded"
              >
                <Trash2 size={13} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
