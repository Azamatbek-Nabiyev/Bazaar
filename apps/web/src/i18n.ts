import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uzCommon from "./locales/uz/common.json";
import uzCheckout from "./locales/uz/checkout.json";
import uzAuth from "./locales/uz/auth.json";
import uzProduct from "./locales/uz/product.json";
import uzProfile from "./locales/uz/profile.json";
import uzAbout from "./locales/uz/about.json";
import uzContact from "./locales/uz/contact.json";
import uzHome from "./locales/uz/home.json";

import ruCommon from "./locales/ru/common.json";
import ruCheckout from "./locales/ru/checkout.json";
import ruAuth from "./locales/ru/auth.json";
import ruProduct from "./locales/ru/product.json";
import ruProfile from "./locales/ru/profile.json";
import ruAbout from "./locales/ru/about.json";
import ruContact from "./locales/ru/contact.json";
import ruHome from "./locales/ru/home.json";

import enCommon from "./locales/en/common.json";
import enCheckout from "./locales/en/checkout.json";
import enAuth from "./locales/en/auth.json";
import enProduct from "./locales/en/product.json";
import enProfile from "./locales/en/profile.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import enHome from "./locales/en/home.json";

export const SUPPORTED_LANGUAGES = ["uz", "ru", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: [
      "common",
      "checkout",
      "auth",
      "product",
      "profile",
      "about",
      "contact",
      "home",
    ],
    defaultNS: "common",
    resources: {
      uz: {
        common: uzCommon,
        checkout: uzCheckout,
        auth: uzAuth,
        product: uzProduct,
        profile: uzProfile,
        about: uzAbout,
        contact: uzContact,
        home: uzHome,
      },
      ru: {
        common: ruCommon,
        checkout: ruCheckout,
        auth: ruAuth,
        product: ruProduct,
        profile: ruProfile,
        about: ruAbout,
        contact: ruContact,
        home: ruHome,
      },
      en: {
        common: enCommon,
        checkout: enCheckout,
        auth: enAuth,
        product: enProduct,
        profile: enProfile,
        about: enAbout,
        contact: enContact,
        home: enHome,
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "bazaar_language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
