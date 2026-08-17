type PriceRange = {
  min: number;
  max: number;
};

type FilterSidebarProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange: PriceRange;
  onPriceChange: (priceRange: PriceRange) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-8">
      {/* Qidiruv */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Search</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Kategoriya */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryToggle(cat)}
                className="accent-neutral-900"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Narx oralig'i */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              onPriceChange({ ...priceRange, min: Number(e.target.value) })
            }
            placeholder="Min"
            className="w-full border border-neutral-300 px-2 py-2 text-sm"
          />
          <span className="text-neutral-400">–</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              onPriceChange({ ...priceRange, max: Number(e.target.value) })
            }
            placeholder="Max"
            className="w-full border border-neutral-300 px-2 py-2 text-sm"
          />
        </div>
      </div>

      {/* Saralash */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-neutral-300 px-3 py-2 text-sm bg-white"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="text-sm text-neutral-500 underline underline-offset-2 text-left w-fit"
      >
        Reset filters
      </button>
    </aside>
  );
}