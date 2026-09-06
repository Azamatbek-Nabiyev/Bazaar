type TopProductDisplay = { name: string; sold: number; revenue: string };

export const TopProducts = ({ products }: { products: TopProductDisplay[] }) => (
  <div className="bg-white border border-neutral-200 rounded-xl p-6">
    <h2 className="font-bold text-neutral-900 mb-5">Top Products</h2>
    {products.length === 0 ? (
      <p className="text-sm text-neutral-400">No sales data yet.</p>
    ) : (
    <div className="flex flex-col gap-4">
      {products.map((p, i) => (
        <div key={p.name} className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 text-xs font-semibold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-800 truncate">{p.name}</p>
            <p className="text-xs text-neutral-400">{p.sold} sold</p>
          </div>
          <span className="text-sm font-semibold text-neutral-700 shrink-0">{p.revenue}</span>
        </div>
      ))}
    </div>
    )}
  </div>
);