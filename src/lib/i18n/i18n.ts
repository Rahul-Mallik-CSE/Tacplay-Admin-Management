/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  languageLabels,
  languageLocaleMap,
  supportedLanguages,
  translations,
  type SupportedLanguage,
} from "./translations";

export const LANGUAGE_STORAGE_KEY = "tacplay-admin-language";

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY,
  ) as SupportedLanguage | null;
  if (stored && supportedLanguages.includes(stored)) {
    return stored;
  }

  const documentLanguage = document.documentElement.lang as SupportedLanguage;
  return supportedLanguages.includes(documentLanguage)
    ? documentLanguage
    : "en";
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: translations.en },
      de: { translation: translations.de },
      fr: { translation: translations.fr },
      es: { translation: translations.es },
    },
    lng: getInitialLanguage(),
    fallbackLng: "en",
    supportedLngs: supportedLanguages as unknown as string[],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export { i18n, languageLabels, languageLocaleMap, supportedLanguages };
export type { SupportedLanguage };
