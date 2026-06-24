"use client";

import { Globe } from "lucide-react";
import { useLanguage, type Locale } from "@/i18n/LanguageProvider";

const locales: Locale[] = ["en", "si", "ta"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className={className}>
      <label className="sr-only" htmlFor="language-switcher">
        Language
      </label>
      <div className="flex items-center gap-1 text-sm">
        <Globe className="h-4 w-4 text-charcoal/60" />
        <select
          id="language-switcher"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="bg-transparent text-sm font-medium text-charcoal focus:outline-none"
        >
          {locales.map((l) => (
            <option key={l} value={l}>
              {t(`languageNames.${l}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
