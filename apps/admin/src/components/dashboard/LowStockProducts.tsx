import { AlertTriangle } from "lucide-react";
import type { LowStockProduct } from "../../types/dashboard";
import { getImageUrl } from "../../utils/getImageUrl";

export const LowStockProducts = ({ products }: { products: LowStockProduct[] }) => (
  <div className="bg-white border border-neutral-200 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-5">
      <AlertTriangle size={16} className="text-orange-600" />
      <h2 className="font-bold text-neutral-900">Low Stock Products</h2>
    </div>

    {products.length === 0 ? (
      <p className="text-sm text-neutral-400">All products are well stocked.</p>
    ) : (
      <div className="flex flex-col gap-4">
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-3">
            <img
              src={getImageUrl(p.image)}
              alt={p.title}
              className="w-9 h-9 rounded-lg object-cover object-top bg-neutral-100 shrink-0"
            />
            <p className="flex-1 min-w-0 text-sm font-medium text-neutral-800 truncate">
              {p.title}
            </p>
            <span className="text-sm font-semibold text-red-600 shrink-0">
              {p.stock} left
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);
