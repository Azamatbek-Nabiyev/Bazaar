import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Women's Edit",
    styles: "1,240 styles",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
    href: "/products?category=women",
    size: "large" as const,
  },
  {
    name: "Men's Edit",
    styles: "830 styles",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80",
    href: "/products?category=men",
    size: "small" as const,
  },
  {
    name: "Footwear",
    styles: "560 styles",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    href: "/products?category=footwear",
    size: "small" as const,
  },
  {
    name: "Bags",
    styles: "210 styles",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    href: "/products?category=bags",
    size: "small" as const,
  },
  {
    name: "Accessories",
    styles: "340 styles",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    href: "/products?category=accessories",
    size: "small" as const,
  },
];

export default function CategoryShowcase() {
  const large = CATEGORIES.find((c) => c.size === "large")!;
  const small = CATEGORIES.filter((c) => c.size === "small");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
            Browse
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">
            Shop by Category
          </h2>
        </div>
        <Link
          to="/products"
          className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          All Categories →
        </Link>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Large featured category */}
        <Link
          to={large.href}
          className="group relative h-[400px] overflow-hidden bg-neutral-100"
        >
          <img
            src={large.image}
            alt={large.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-2">
              {large.styles}
            </p>
            <p className="font-serif text-3xl font-bold text-white mb-4">
              {large.name}
            </p>
            <span className="inline-flex items-center gap-2 border border-white text-white text-sm font-semibold px-5 py-2.5 transition-colors group-hover:bg-white group-hover:text-neutral-900">
              Shop Now →
            </span>
          </div>
        </Link>

        {/* Small category grid */}
        <div className="grid grid-cols-2">
          {small.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative h-[200px] overflow-hidden bg-neutral-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <p className="text-white/70 text-[10px] font-semibold tracking-widest uppercase mb-1">
                  {category.styles}
                </p>
                <p className="text-white text-base font-bold">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}