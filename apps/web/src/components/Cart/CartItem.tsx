import { Minus, Plus, X } from "lucide-react";
import type { CartItemData } from "../../types/cartItem";
import { getImageUrl } from "../../utils/getImageUrl";

type CartItemProps = {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
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
              {item.size ? ` · Size ${item.size}` : ""}
            </p>
          </div>

          <button
            onClick={() => onRemove(item._id)}
            aria-label="Remove item"
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
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="text-base font-bold text-neutral-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}