import React, { useState } from "react";
import { CreditCard } from "lucide-react";

export const PaymentForm = () => {
  const [form, setForm] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-5">
        <CreditCard size={18} />
        <h2 className="font-bold">Payment</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="text-[11px] uppercase text-gray-400 mb-1">
            Card Number
          </div>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div className="col-span-2">
          <div className="text-[11px] uppercase text-gray-400 mb-1">
            Name on Card
          </div>
          <input
            type="text"
            value={form.nameOnCard}
            onChange={(e) => handleChange("nameOnCard", e.target.value)}
            className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <div className="text-[11px] uppercase text-gray-400 mb-1">
            Expiry Date
          </div>
          <input
            type="text"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={(e) => handleChange("expiry", e.target.value)}
            className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <div className="text-[11px] uppercase text-gray-400 mb-1">CVV</div>
          <input
            type="text"
            placeholder="123"
            value={form.cvv}
            onChange={(e) => handleChange("cvv", e.target.value)}
            className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
};
