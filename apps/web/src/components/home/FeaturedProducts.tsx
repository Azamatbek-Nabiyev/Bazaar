import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard/ProductCard";
import { useGetProductsQuery } from "../../store/api";
import type { Product } from "../../types/product";

const TABS = [
  { key: "all", value: "Barchasi" },
  { key: "men", value: "Erkaklar" },
  { key: "women", value: "Ayollar" },
  { key: "electronics", value: "Elektronika" },
];

export default function FeaturedProducts() {
  const { t } = useTranslation(["home", "common"]);
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const { data, isLoading, isError } = useGetProductsQuery(undefined);

  const products = data?.data ?? [];

  const filtered =
    activeTab === TABS[0].value
      ? products
      : products.filter((p: Product) => p.category.title === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
            {t("featured.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">
            {t("featured.title")}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                activeTab === tab.value
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t(`featured.tabs.${tab.key}`)}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-neutral-400 py-12">{t("loading")}</p>
      )}

      {isError && (
        <p className="text-center text-red-500 py-12">
          {t("errors.productLoadFailed", { ns: "common" })}
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
          {t("featured.viewAll")}
        </button>
      </div>
    </section>
  );
}