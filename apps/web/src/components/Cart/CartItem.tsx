import { Minus, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CartItemData } from "../../types/cartItem";
import { getImageUrl } from "../../utils/getImageUrl";
import { formatPrice } from "../../utils/formatPrice";

type CartItemProps = {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const { t } = useTranslation("checkout");
  return (
    <div className="flex gap-4 py-6 border-b border-neutral-200">
      <div className="w-24 h-24 shrink-0 bg-neutral-100 overflow-hidden">
        <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {item.brand}
            </p>
            <p className="text-base font-semibold text-neutral-900 mt-0.5">
              {item.title}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {item.color}
              {item.size ? ` · ${t("summary.size")} ${item.size}` : ""}
            </p>
          </div>

          <button
            onClick={() => onRemove(item._id)}
            aria-label={t("cart.removeItem")}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-neutral-300">
            <button
              onClick={() => onQuantityChange(item._id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item._id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="text-base font-bold text-neutral-900">
            {formatPrice(item.price * item.quantity)} so'm
          </p>
        </div>

        {item.quantity >= item.stock && (
          <p className="text-xs text-amber-600 mt-1">{t("cart.maxStock")}</p>
        )}
      </div>
    </div>
  );
}