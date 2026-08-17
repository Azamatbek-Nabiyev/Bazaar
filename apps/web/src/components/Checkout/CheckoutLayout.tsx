import React from 'react';
import { ShippingAddressForm } from './ShippingAddressForm';
import { PaymentForm } from './PaymentForm';
import { CheckoutSummary } from './CheckoutSummary';

export const CheckoutLayout = () => {
  const handlePlaceOrder = () => {
    alert('Buyurtma joylandi (test)');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-6">
          <ShippingAddressForm />
          <PaymentForm />
        </div>

        <div className="col-span-1">
          <CheckoutSummary onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </div>
  );
};