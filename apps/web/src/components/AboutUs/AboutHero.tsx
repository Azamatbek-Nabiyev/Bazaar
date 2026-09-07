import { useTranslation } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation("about");

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
          {t("hero.eyebrow")}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
          {t("hero.titleLine1")}
          <br />
          {t("hero.titleLine2")}
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-md">
          {t("hero.description")}
        </p>
      </div>

      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src="/public/bazaar_about_hero_color.png"
          alt={t("hero.imageAlt")}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
