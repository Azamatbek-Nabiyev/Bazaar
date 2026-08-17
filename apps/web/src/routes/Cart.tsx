import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItem from "../components/Cart/CartItem";
import type { CartItemData } from "../types/cartItem";

// Example static data — later this comes from Redux cart state / api/cart.ts
const INITIAL_ITEMS: CartItemData[] = [
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    brand: "Stride",
    title: "Air Runner Pro",
    price: 129,
    color: "Red",
    size: "42",
    quantity: 1,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80",
    brand: "Acoustic",
    title: "Pro Wireless Headphones",
    price: 249,
    color: "Black",
    quantity: 2,
  },
];

const SHIPPING = 12;

export default function Cart() {
  const [items, setItems] = useState<CartItemData[]>(INITIAL_ITEMS);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = items.length > 0 ? subtotal + SHIPPING : 0;

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-neutral-300" />
        <p className="text-xl font-semibold text-neutral-900 mt-4">
          Your cart is empty
        </p>
        <p className="text-sm text-neutral-500 mt-1">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="inline-block text-white text-sm font-semibold px-6 py-3 mt-6"
          style={{ backgroundColor: "#d94f2b" }}
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-neutral-50 p-6 h-fit">
          <p className="text-lg font-bold text-neutral-900 mb-4">Order Summary</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span>${SHIPPING.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-neutral-900 mt-4 pt-4 border-t border-neutral-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center text-white text-sm font-semibold py-3.5 mt-6 transition-colors hover:brightness-110"
            style={{ backgroundColor: "#d94f2b" }}
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="block text-center text-sm font-medium text-neutral-600 hover:text-neutral-900 mt-3 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}