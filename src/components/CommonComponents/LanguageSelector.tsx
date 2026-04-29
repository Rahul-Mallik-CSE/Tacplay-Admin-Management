/** @format */

"use client";

import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  i18n,
  languageLabels,
  supportedLanguages,
  type SupportedLanguage,
} from "@/lib/i18n/i18n";

const LanguageSelector = () => {
  const { t } = useTranslation();
  const activeLanguage = (i18n.language as SupportedLanguage) || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-primary transition-colors hover:border-secondary">
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline text-sm font-medium">
          {t("navbar.language")}
        </span>
        <span className="text-sm font-semibold uppercase">
          {activeLanguage}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 mt-2 border border-secondary bg-background rounded-lg shadow-lg"
      >
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language}
            className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer"
            onClick={() => i18n.changeLanguage(language)}
          >
            <span>{languageLabels[language]}</span>
            {activeLanguage === language ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
