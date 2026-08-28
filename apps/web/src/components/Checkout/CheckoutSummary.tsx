import { selectCartItems } from "../../store/cartSlice";
import { useAppSelector } from "../../store/hooks";
import type { CartItemData } from "../../types/cartItem";
import { shippingCost, taxRate } from "./mockData";

export const CheckoutSummary = ({
  onPlaceOrder,
  isSubmitting
}: {
  onPlaceOrder: () => void;
   isSubmitting?: boolean;
}) => {

   const checkoutItems = useAppSelector(selectCartItems);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-fit">
      <h2 className="font-bold mb-4">Order Summary</h2>

      <div className="flex flex-col gap-3 pb-4 mb-4 border-b">
        {checkoutItems.map((item) => (
          <OrderSummaryItem key={item._id} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t mb-4">
        <span className="font-bold">Total</span>
        <span className="font-bold text-lg">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Yuborilmoqda...' : 'Place Order'}
      </button>
    </div>
  );
};

// Checkout uchun read-only qator — CartItem'dagi kabi +/- va X tugmasi yo'q,
// chunki checkout bosqichida miqdorni bu yerdan o'zgartirish shart emas
const OrderSummaryItem = ({ item }: { item: CartItemData }) => (
  <div className="flex items-center gap-3">
    <img
      src={item.image}
      alt={item.title}
      className="w-12 h-12 rounded object-cover bg-gray-100"
    />
    <div className="flex-1">
      <div className="text-sm font-medium">{item.title}</div>
      <div className="text-xs text-gray-400">
        {item.color}
        {item.size ? ` · Size ${item.size}` : ""} · Qty {item.quantity}
      </div>
    </div>
    <div className="text-sm font-medium">
      ${(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
);
