import { useTranslation } from "react-i18next";

export default function OurStory() {
  const { t } = useTranslation("about");

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden order-2 md:order-1">
        <img
          src="/public/bazaar_about_story_color.png"
          alt={t("story.imageAlt")}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="order-1 md:order-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-4">
          {t("story.eyebrow")}
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 mb-5">
          {t("story.title")}
        </h2>
        <p className="text-neutral-500 leading-relaxed mb-4">
          {t("story.paragraph1")}
        </p>
        <p className="text-neutral-500 leading-relaxed">
          {t("story.paragraph2")}
        </p>
      </div>
    </section>
  );
}
