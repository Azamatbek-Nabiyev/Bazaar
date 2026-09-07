import { useState } from "react";
import { Heart, ShoppingBag, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import { selectCartCount } from "../../store/cartSlice";
import { selectSavedCount } from "../../store/savedItemsSlice";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";

export default function Header() {
  const { t, i18n } = useTranslation("common");

  const cartCount = useAppSelector(selectCartCount);
  const savedCount = useAppSelector(selectSavedCount);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const NAV_LINKS = [
    { title: t("nav.home"), link: "/" },
    { title: t("nav.products"), link: "/products" },
    { title: t("nav.bestsellers"), link: "/bestsellers" },
    { title: t("nav.flashsale"), link: "/flashsale" },
    { title: t("nav.about"), link: "/about" },
    { title: t("nav.contact"), link: "/contact" },
  ];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-neutral-200">
      {/* Promo strip */}
      <div className="bg-neutral-900 text-white text-xs text-center py-2 tracking-wide">
        {t("promo")}
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-neutral-900"
          >
            {t("brand")}
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                className="relative text-sm font-medium py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-neutral-700 hover:text-amber-500"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 text-neutral-700">
          <div className="relative">
            <button
              type="button"
              aria-label="Language"
              onClick={() => setLangMenuOpen((open) => !open)}
              className="flex items-center gap-1 p-2 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <Globe size={20} />
              <span className="text-xs font-semibold uppercase">
                {i18n.language}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-neutral-200 shadow-md rounded-md py-1 z-20">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 ${
                      i18n.language === lang
                        ? "font-semibold text-neutral-900"
                        : "text-neutral-600"
                    }`}
                  >
                    {t(`language.${lang}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/profile">
            <button
              aria-label={t("aria.account")}
              className="p-2 rounded-md hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <User size={20} />
            </button>
          </Link>
          <Link to="/saved-items">
            <button
              aria-label={t("aria.wishlist")}
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
              aria-label={t("aria.cart")}
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
