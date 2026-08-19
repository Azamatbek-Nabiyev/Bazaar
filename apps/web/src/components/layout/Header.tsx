import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCartCount } from "../../store/cartSlice";
import { selectSavedCount } from "../../store/savedItemsSlice";

const NAV_LINKS = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Products',
    link: '/products'
  },
  {
    title: 'About us',
    link: '/about'
  },
  {
    title: 'Contact',
    link: '/contact'
  },

];

export default function Header() {

  const cartCount = useAppSelector(selectCartCount);
  const savedCount = useAppSelector(selectSavedCount)

  return (
    <header className="w-full bg-white border-b border-neutral-200">
      {/* Promo strip */}
      <div className="bg-neutral-900 text-white text-xs text-center py-2 tracking-wide">
        Use FIRST30 for 30% off your debut order
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-neutral-900"
          >
            MODERNO
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                className={`relative text-sm font-medium py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full ${
                  link.link === "Sale"
                    ? "text-red-600 hover:text-amber-500"
                    : "text-neutral-700 hover:text-amber-500"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 text-neutral-700">
          <Link to="/profile">
            <button
              aria-label="Account"
              className="p-2 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <User size={20} />
            </button>
          </Link>
          <Link to="/saved-items">
            <button
              aria-label="Wishlist"
              className="p-2 rounded-md hover:bg-neutral-900 hover:text-white transition-colors relative"
            >
              <Heart size={20} />
              {savedCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {savedCount}
              </span>
              )}
            </button>
          </Link>
          <Link to="/cart">
            <button
              aria-label="Cart"
              className="p-2 rounded-md hover:bg-neutral-900 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
