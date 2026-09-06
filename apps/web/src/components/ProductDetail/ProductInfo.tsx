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

export default function ProductInfo({
  _id,
  image,
  brand,
  title,
  price,
  rating,
  reviewCount,
  description,
  colors,
  sizes,
  category
}: Product) {
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isSaved = useAppSelector(selectIsSaved(_id));

  const handleAddToCart = () => {
    dispatch(
      addItem({
        _id,
        title,
        brand,
        image,
        price,
        color: colors?.[selectedColor] ?? "",
        size: selectedSize ?? "",
        quantity,
      })
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeSavedItem(_id));
    } else {
      dispatch(addSavedItem({
        _id,
        image,
        brand,
        title,
        price,
        rating,
        reviewCount,
        description,
        colors,
        sizes,
        category
      }));
    }
  };

  return (
    <div className="max-w-md">
      {/* Brand */}
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
        {brand}
      </p>

      {/* Title */}
      <h1 className="text-3xl font-bold text-neutral-900 mt-1">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-amber-400">
          {"★".repeat(Math.round(rating))}

          <span className="text-neutral-300">
            {"★".repeat(5 - Math.round(rating))}
          </span>
        </span>

        <span className="text-sm text-neutral-500">
          ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-neutral-900 mt-4">
        ${price.toFixed(2)}
      </p>

      {/* Description */}
      <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
        {description}
      </p>

      {/* Color selector */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-900 mb-2">
          Color: {colors[selectedColor]}
        </p>

        <div className="flex items-center gap-2">
          {colors.map((color, index) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(index)}
              aria-label={`Select ${color}`}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 transition-all ${
                selectedColor === index
                  ? "ring-neutral-900"
                  : "ring-transparent hover:ring-neutral-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-900 mb-2">
          Size
        </p>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                selectedSize === size
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart + Wishlist */}
      <div className="flex items-center gap-4 mt-8">
        {/* Quantity */}
        <div className="flex items-center border border-neutral-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-11 text-lg text-neutral-600 hover:bg-neutral-100"
          >
            −
          </button>

          <span className="w-10 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-11 text-lg text-neutral-600 hover:bg-neutral-100"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 text-white text-sm font-semibold py-3.5 transition-colors hover:brightness-110"
          style={{ backgroundColor: "#d94f2b" }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label="Toggle wishlist"
          className="w-11 h-11 flex items-center justify-center border border-neutral-300 hover:border-neutral-900 transition-colors"
        >
          <Heart
            size={18}
            className={
              isSaved
                ? "fill-red-600 text-red-600"
                : "text-neutral-600"
            }
          />
        </button>
      </div>
    </div>
  );
}