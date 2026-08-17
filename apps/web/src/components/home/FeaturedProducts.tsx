import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useGetProductsQuery } from "../../store/api";
import type { Product } from "../../types/product";

const TABS = ["Barchasi", "Erkaklar", "Ayollar", "Elektronika"];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("Barchasi");
  const { data, isLoading, isError } = useGetProductsQuery(undefined);

  const products = data?.data ?? [];

  const filtered =
    activeTab === "Barchasi"
      ? products
      : products.filter((p: Product) => p.category.title === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
            Curated Picks
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">
            Featured Products
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {tab}
            </button>
          ))}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product:Product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button className="border border-neutral-300 text-sm font-semibold text-neutral-900 px-8 py-3 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors">
          View All Products
        </button>
      </div>
    </section>
  );
}