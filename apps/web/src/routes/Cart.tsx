import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import CartItem from "../components/Cart/CartItem";
import { formatPrice } from "../utils/formatPrice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeItem,
} from "../store/cartSlice";

const SHIPPING = 12;

export default function Cart() {
  const { t } = useTranslation("checkout");
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ _id: id, quantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const total = items.length > 0 ? subtotal + SHIPPING : 0;

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-neutral-300" />
        <p className="text-xl font-semibold text-neutral-900 mt-4">
          {t("cart.emptyTitle")}
        </p>
        <p className="text-sm text-neutral-500 mt-1">
          {t("cart.emptyText")}
        </p>
        <Link
          to="/"
          className="inline-block text-white text-sm font-semibold px-6 py-3 mt-6"
          style={{ backgroundColor: "#d94f2b" }}
        >
          {t("cart.continueShopping")}
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">{t("cart.title")}</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-neutral-50 p-6 h-fit">
          <p className="text-lg font-bold text-neutral-900 mb-4">{t("summary.title")}</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>{t("summary.subtotal")}</span>
              <span>{formatPrice(subtotal)} so'm</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>{t("summary.shipping")}</span>
              <span>{formatPrice(SHIPPING)} so'm</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-neutral-900 mt-4 pt-4 border-t border-neutral-200">
            <span>{t("summary.total")}</span>
            <span>{formatPrice(total)} so'm</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center text-white text-sm font-semibold py-3.5 mt-6 transition-colors hover:brightness-110"
            style={{ backgroundColor: "#d94f2b" }}
          >
            {t("cart.proceedToCheckout")}
          </Link>

          <Link
            to="/"
            className="block text-center text-sm font-medium text-neutral-600 hover:text-neutral-900 mt-3 transition-colors"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    </section>
  );
}