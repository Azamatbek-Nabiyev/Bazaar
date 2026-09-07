import { useTranslation } from "react-i18next";

const FOOTER_COLUMN_KEYS = ["shop", "support", "company"] as const;

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-white text-lg font-bold mb-3">{t("brand")}</p>
          <p className="text-sm text-neutral-400">{t("footer.tagline")}</p>
        </div>

        {FOOTER_COLUMN_KEYS.map((key) => {
          const links = t(`footer.columns.${key}.links`, {
            returnObjects: true,
          }) as string[];
          return (
            <div key={key}>
              <p className="text-white text-sm font-semibold mb-3">
                {t(`footer.columns.${key}.title`)}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
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
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row justify-between gap-2">
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">{t("footer.privacyPolicy")}</a>
          <a href="#" className="hover:text-white">{t("footer.termsOfService")}</a>
        </div>
      </div>
    </footer>
  );
}
