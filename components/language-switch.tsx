"use client";

import { Button } from "@/components/ui/button";
import { useLocale, useUi } from "@/lib/locale";
import type { Preference } from "@/lib/locale-shared";

const choices: Preference[] = ["browser", "da", "en"];

export function LanguageSwitch() {
  const { preference, locale, setPreference } = useLocale();
  const m = useUi();
  const labels: Record<Preference, string> = {
    browser: m.choiceBrowser,
    da: m.choiceDanish,
    en: m.choiceEnglish,
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <p id="language-label" className="text-sm font-medium text-muted-foreground">
          {m.language}
        </p>
        <div role="radiogroup" aria-labelledby="language-label" className="flex flex-wrap gap-2">
          {choices.map((choice) => (
            <Button
              key={choice}
              type="button"
              size="sm"
              variant={preference === choice ? "default" : "outline"}
              role="radio"
              aria-checked={preference === choice}
              onClick={() => setPreference(choice)}
            >
              {labels[choice]}
            </Button>
          ))}
        </div>
      </div>
      {preference === "browser" ? (
        <p className="text-right text-xs text-muted-foreground">
          {locale === "da" ? m.browserDanish : m.browserEnglish}
        </p>
      ) : null}
    </div>
  );
}
