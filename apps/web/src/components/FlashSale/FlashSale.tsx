import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import FilterSidebar from './FilterSidebar';
import { useGetProductsQuery } from '../../store/api';
import type { Product } from '../../types/product';

export default function FlashSale() {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const products: Product[] = data?.data.filter((item:Product) => item.badge == 'sale') ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [sortBy, setSortBy] = useState('default');

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category.title));
    return Array.from(unique);
  }, [products]);

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 0 });
    setSortBy('default');
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.title)
      );
    }

    if (priceRange.min > 0) {
      result = result.filter((p) => p.price >= priceRange.min);
    }
    if (priceRange.max > 0) {
      result = result.filter((p) => p.price <= priceRange.max);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategories, priceRange, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
          Shop
        </p>
        <h1 className="text-3xl font-bold text-neutral-900">All Best Seller Products</h1>
      </div>

      <div className="flex gap-10">
        <FilterSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        <div className="flex-1">
          {isLoading && (
            <p className="text-center text-neutral-400 py-12">Yuklanmoqda...</p>
          )}

          {isError && (
            <p className="text-center text-red-500 py-12">
              Mahsulotlarni yuklashda xatolik yuz berdi
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <p className="text-sm text-neutral-400 mb-6">
                {filtered.length} products
              </p>

              {filtered.length === 0 ? (
                <p className="text-center text-neutral-400 py-12">
                  Hech narsa topilmadi
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`}>
                      <ProductCard {...product} />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}