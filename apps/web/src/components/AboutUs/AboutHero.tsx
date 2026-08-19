export default function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
          About Moderno
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
          Design With Intention,
          <br />
          Built to Last.
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-md">
          We started Moderno with a simple belief — that everyday essentials
          deserve thoughtful design. Every piece we sell is chosen for its
          craftsmanship, not just its trend.
        </p>
      </div>

      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="Our studio"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}