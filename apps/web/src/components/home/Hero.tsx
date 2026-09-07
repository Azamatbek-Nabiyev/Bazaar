import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

type HeroSlideContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  alt: string;
};

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1621784562807-cb450c2f5efc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=987&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=987&auto=format&fit=crop",
];

const TRUST_BADGES = [
  { icon: RotateCcw, key: "easyReturns" },
  { icon: ShieldCheck, key: "secureCheckout" },
  { icon: Headphones, key: "support" },
];

// TODO: replace with real hero slide/trust badge data once category landing pages exist
export default function Hero() {
  const { t } = useTranslation("home");
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = t("hero.slides", { returnObjects: true }) as HeroSlideContent[];
  const current = slides[activeSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
        {/* Left: copy */}
        <div className="px-6 md:px-16 py-16 md:py-24">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#d9a24f" }}
          >
            {current.eyebrow}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-[1.05]">
            {current.titleLine1}
            <br />
            {current.titleLine2}
          </h1>

          <p className="text-neutral-400 text-base mt-5 max-w-sm">
            {current.subtitle}
          </p>

          <div className="flex items-center gap-6 mt-8">
            <Link
              to="/products"
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-3.5 transition-colors hover:brightness-110"
              style={{ backgroundColor: "#d94f2b" }}
            >
              {current.cta}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center gap-5 mt-10 text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <RotateCcw size={14} style={{ color: "#d9a24f" }} />
              {t("hero.returns30")}
            </span>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-10">
            {SLIDE_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveSlide(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-white" : "w-4 bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: rotating background image */}
        <div className="relative h-72 md:h-[560px] overflow-hidden">
          {SLIDE_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={slides[i]?.alt ?? ""}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
                i === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Fade edges into the black background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-neutral-900/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-transparent to-transparent" />

          {/* Slide counter */}
          <span className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-medium px-3 py-1.5">
            {String(activeSlide + 1).padStart(2, "0")} /{" "}
            {String(SLIDE_IMAGES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {TRUST_BADGES.map(({ icon: Icon, key }, i) => (
            <div
              key={key}
              className={`flex items-center gap-3 px-6 py-6 ${
                i > 0 ? "md:border-l border-neutral-800" : ""
              }`}
            >
              <Icon size={20} style={{ color: "#d9a24f" }} />
              <div>
                <p className="text-sm font-semibold text-white">
                  {t(`hero.trust.${key}Title`)}
                </p>
                <p className="text-xs text-neutral-500">
                  {t(`hero.trust.${key}Subtitle`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
