import { useEffect, useState } from "react";
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const SLIDES = [
  "https://images.unsplash.com/photo-1621784562807-cb450c2f5efc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682095757120-c9abb908ed60?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const TRUST_BADGES = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $75" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day free returns" },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    subtitle: "256-bit encryption",
  },
  { icon: Headphones, title: "24/7 Support", subtitle: "We're always here" },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
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
            Men's New Season
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.05]">
            Dress With
            <br />
            Intention
          </h1>

          <p className="text-neutral-400 text-base mt-5 max-w-sm">
            Clean silhouettes, premium fabrics, and timeless design for the
            discerning man.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-3.5 transition-colors hover:brightness-110"
              style={{ backgroundColor: "#d94f2b" }}
            >
              Shop Men's
              <ArrowRight size={16} />
            </button>
            <button className="text-white text-sm font-semibold underline underline-offset-4 hover:text-neutral-300 transition-colors">
              View Lookbook
            </button>
          </div>

          <div className="flex items-center gap-5 mt-10 text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <Truck size={14} style={{ color: "#d9a24f" }} />
              Free shipping $75+
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw size={14} style={{ color: "#d9a24f" }} />
              30-day returns
            </span>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-10">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-white" : "w-4 bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: rotating background image */}
        <div className="relative h-72 md:h-[560px] overflow-hidden">
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Collection showcase"
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
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {TRUST_BADGES.map(({ icon: Icon, title, subtitle }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 px-6 py-6 ${
                i > 0 ? "md:border-l border-neutral-800" : ""
              }`}
            >
              <Icon size={20} style={{ color: "#d9a24f" }} />
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-neutral-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
