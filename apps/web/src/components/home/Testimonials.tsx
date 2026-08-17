const TESTIMONIALS = [
  {
    name: "Sarah M.",
    date: "Jul 7, 2026",
    rating: 5,
    quote:
      "Exceeded every expectation. The stories are impeccable, and the finishing on that beautiful weight to it, I've been using it daily for three weeks now.",
  },
  {
    name: "James R.",
    date: "Jul 20, 2026",
    rating: 5,
    quote:
      "My new daily driver. Wore the Air Runner Pro on a two-day conference — walked miles across the convention floor. My feet were comfortable the whole time.",
  },
  {
    name: "Priya K.",
    date: "Aug 3, 2026",
    rating: 5,
    quote:
      "Stunning watch, perfect gift. The packaging alone made my partner gasp. The watch is everything I hoped for — clean, minimal, and a beautiful weight. The exposed back catches the light beautifully.",
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(count)}
      <span className="text-neutral-300">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
          Social Proof
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 mb-10">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Rating summary */}
          <div>
            <p className="text-5xl font-bold text-neutral-900">4.8</p>
            <Stars count={5} />
            <p className="text-sm text-neutral-500 mt-1">
              24,309 verified reviews
            </p>

            <div className="space-y-1.5 mt-6">
              {RATING_BREAKDOWN.map(({ stars, percent }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 w-3">{stars}</span>
                  <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 w-8 text-right">
                    {percent}%
                  </span>
                </div>
              ))}
            </div>

            <button className="text-sm font-semibold text-neutral-900 underline underline-offset-4 mt-6 hover:text-neutral-600 transition-colors">
              Read all reviews
            </button>
          </div>

          {/* Testimonial cards */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.name}
                className="bg-white p-5 border border-neutral-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <Stars count={review.rating} />
                  <span className="text-xs text-neutral-400">{review.date}</span>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  "{review.quote}"
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center">
                    {review.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-neutral-900">
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}