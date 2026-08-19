export default function OurStory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden order-2 md:order-1">
        <img
          src="/images/about-story.jpg"
          alt="Our story"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="order-1 md:order-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
          Our Story
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 mb-5">
          From a Small Studio to a Global Community
        </h2>
        <p className="text-neutral-500 leading-relaxed mb-4">
          Moderno began in 2019 as a two-person studio with a single
          question: why does buying quality goods have to be complicated?
          We set out to build a curated marketplace where every product
          earns its place.
        </p>
        <p className="text-neutral-500 leading-relaxed">
          Today, we work with hundreds of independent makers and design
          houses across the world, bringing thoughtfully made pieces to
          customers who care about the story behind what they own.
        </p>
      </div>
    </section>
  );
}