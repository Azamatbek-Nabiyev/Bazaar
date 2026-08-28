export default function OurStory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden order-2 md:order-1">
        <img
          src="/public/bazaar_about_story_color.png"
          alt="Our journey"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="order-1 md:order-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
          Our Journey
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 mb-5">
          Built on Quality, Driven by Purpose
        </h2>
        <p className="text-neutral-500 leading-relaxed mb-4">
          Bazaar started with a simple idea: finding quality products should
          be easy and enjoyable. We created a curated marketplace where every
          item is carefully selected for its design, quality, and value.
        </p>
        <p className="text-neutral-500 leading-relaxed">
          Today, Bazaar brings together a carefully selected collection of
          products for people who appreciate thoughtful design, reliable
          quality, and pieces made to become part of everyday life.
        </p>
      </div>
    </section>
  );
}