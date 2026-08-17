import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "../../types/product";

export default function ProductInfo({
  brand,
  title,
  price,
  rating,
  reviewCount,
  description,
  colors,
  sizes,
}: Product) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-md">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
        {brand}
      </p>
      <h1 className="text-3xl font-bold text-neutral-900 mt-1">{title}</h1>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-amber-400">
          {"★".repeat(Math.round(rating))}
          <span className="text-neutral-300">
            {"★".repeat(5 - Math.round(rating))}
          </span>
        </span>
        <span className="text-sm text-neutral-500">({reviewCount} reviews)</span>
      </div>

      <p className="text-2xl font-bold text-neutral-900 mt-4">${price}</p>

      <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
        {description}
      </p>

      {/* Color selector */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-900 mb-2">
          Color: {colors[selectedColor]}
        </p>
        <div className="flex items-center gap-2">
          {colors.map((color, i) => (
            <button
              key={color}
              onClick={() => setSelectedColor(i)}
              aria-label={color}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 transition-all ${
                selectedColor === i ? "ring-neutral-900" : "ring-transparent hover:ring-neutral-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-900 mb-2">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size: string) => (
            <button
              key={size}
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

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-4 mt-8">
        <div className="flex items-center border border-neutral-300">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-11 text-lg text-neutral-600 hover:bg-neutral-100"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-11 text-lg text-neutral-600 hover:bg-neutral-100"
          >
            +
          </button>
        </div>

        <button
          className="flex-1 text-white text-sm font-semibold py-3.5 transition-colors hover:brightness-110"
          style={{ backgroundColor: "#d94f2b" }}
        >
          Add to Cart
        </button>

        <button
          aria-label="Add to wishlist"
          className="w-11 h-11 flex items-center justify-center border border-neutral-300 hover:border-neutral-900 transition-colors"
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
}