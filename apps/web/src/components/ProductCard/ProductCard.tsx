import type { Product } from "../../types/product";

export default function ProductCard({
  image,
  brand,
  title,
  price,
  rating,
  reviewCount,
  colors,
  badge,
}: Product) {
  return (
    <div className="w-full max-w-sm h-full flex flex-col overflow-hidden bg-white shadow-md">
      {/* Image */}
      <div className="group relative aspect-square bg-neutral-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-amber-200 text-neutral-900 text-xs font-bold uppercase px-3 py-1 rounded-md">
            {badge}
          </span>
        )}

        {/* Quick add button */}
        <button
          type="button"
          className="absolute bottom-0 left-0 right-0 bg-neutral-900 text-white text-sm font-semibold py-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add
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
            ${price}
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