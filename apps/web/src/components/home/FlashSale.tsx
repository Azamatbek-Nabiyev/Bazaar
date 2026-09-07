import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard/ProductCard";
import { useGetProductsQuery } from "../../store/api";
import type { Product } from "../../types/product";

// Counts down to a fixed target time; swap for a real sale end date from the API.
function useCountdown(hours: number) {
  const [target] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, target - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);

  return { hoursLeft, minutesLeft, secondsLeft };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 text-white text-lg font-bold w-12 h-12 flex items-center justify-center">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

export default function FlashSale() {
  const { t } = useTranslation(["home", "common"]);
  const { hoursLeft, minutesLeft, secondsLeft } = useCountdown(5.55);
  const { data, isLoading, isError } = useGetProductsQuery(undefined);

  const saleProducts = (data?.data ?? []).filter(
    (product:Product) => product.badge === "sale"
  );

  return (
    <section className="bg-neutral-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-red-500 mb-2">
              <Zap size={14} className="fill-red-500" />
              {t("flashSale.limitedTime")}
            </p>
            <h2 className="text-3xl font-bold text-white">{t("flashSale.title")}</h2>
          </div>

          <div className="flex items-center gap-3">
            <TimeBox value={hoursLeft} label={t("flashSale.hours")} />
            <span className="text-white/30 text-lg pb-4">:</span>
            <TimeBox value={minutesLeft} label={t("flashSale.minutes")} />
            <span className="text-white/30 text-lg pb-4">:</span>
            <TimeBox value={secondsLeft} label={t("flashSale.seconds")} />
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
            {saleProducts.map((product:Product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/products?sale=true"
            className="border border-white/30 text-white text-sm font-semibold px-8 py-3 hover:bg-white hover:text-neutral-900 hover:border-white transition-colors"
          >
            {t("flashSale.seeAllSale")}
          </Link>
        </div>
      </div>
    </section>
  );
}