const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["New Arrivals", "Women", "Men", "Accessories", "Sale"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Shipping & Returns", "Size Guide", "FAQ"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Sustainability"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-neutral-800">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Style Delivered To Your Inbox
          </h3>
          <p className="text-sm text-neutral-400 mt-2">
            Be first to know about new arrivals, sales, and exclusive
            member-only perks. Join 120K+ members.
          </p>
        </div>
        <form className="flex w-full max-w-sm">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-neutral-800 text-white text-sm px-4 py-3 rounded-l-md outline-none placeholder:text-neutral-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 rounded-r-md transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-white text-lg font-bold mb-3">MODERNO</p>
          <p className="text-sm text-neutral-400">
            Clean silhouettes, premium fabrics, timeless design.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-white text-sm font-semibold mb-3">
              {column.title}
            </p>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Moderno. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}