import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItem } from "../../store/cartSlice";
import {
  addSavedItem,
  removeSavedItem,
  selectIsSaved,
} from "../../store/savedItemsSlice";
import { getImageUrl } from "../../utils/getImageUrl";

export default function ProductCard(props: Product) {
  const {
    _id,
    image,
    brand,
    title,
    price,
    rating,
    reviewCount,
    colors,
    badge,
  } = props;

  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const isSaved = useAppSelector(selectIsSaved(_id));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addItem({
        _id,
        title,
        brand,
        image,
        price,
        color: colors?.[0] ?? "",
        quantity: 1,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      dispatch(removeSavedItem(_id));
    } else {
      dispatch(addSavedItem(props));
    }
  };

  return (
    <div className="w-full max-w-sm h-full flex flex-col overflow-hidden bg-white shadow-md">
      {/* Image */}
      <div className="group relative aspect-square bg-neutral-100 overflow-hidden">
        <img
          src={getImageUrl(image)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-top"
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-amber-200 text-neutral-900 text-xs font-bold uppercase px-3 py-1 rounded-md">
            {badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
        >
          <Heart
            size={15}
            className={isSaved ? "fill-red-600 text-red-600" : "text-neutral-600"}
          />
        </button>

        {/* Quick add button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 bg-neutral-900 text-white text-sm font-semibold py-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {added ? "Added ✓" : "Quick Add"}
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {brand}
        </p>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <span className="text-lg font-bold text-neutral-900 whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-amber-400">
          <span>
            {"★".repeat(Math.round(rating))}
            <span className="text-neutral-300">
              {"★".repeat(5 - Math.round(rating))}
            </span>
          </span>
          <span className="text-sm text-neutral-500">({reviewCount})</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 pt-1">
          {colors.map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full border border-neutral-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}