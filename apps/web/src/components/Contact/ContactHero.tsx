import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { t } = useTranslation("contact");

  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
      <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
        {t("hero.eyebrow")}
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-5">
        {t("hero.title")}
      </h1>
      <p className="text-neutral-500 leading-relaxed">
        {t("hero.description")}
      </p>
    </section>
  );
}
