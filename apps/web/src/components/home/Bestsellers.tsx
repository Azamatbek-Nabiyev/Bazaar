import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { useGetProductsQuery } from "../../store/api";
import type { Product } from "../../types/product";

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useGetProductsQuery(undefined);

  const products = data?.data ?? [];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
            Top Rated
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">Best Sellers</h2>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            See all
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-neutral-400 py-12">Yuklanmoqda...</p>
      )}

      {isError && (
        <p className="text-center text-red-500 py-12">
          Mahsulotlarni yuklashda xatolik yuz berdi
        </p>
      )}

      {!isLoading && !isError && (
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((product:Product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="shrink-0 w-64 snap-start"
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}