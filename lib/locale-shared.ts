export const LANG_COOKIE = "bf-lang";

export type Preference = "da" | "en" | "browser";
export type Locale = "da" | "en";

export function isPreference(value: string | undefined | null): value is Preference {
  return value === "da" || value === "en" || value === "browser";
}

/** Danish when the first language is Danish. Every other language falls back to English. */
export function localeFromLanguageTag(tag: string | null | undefined): Locale {
  const primary = tag?.split(",")[0]?.trim().toLowerCase() ?? "";
  return primary.startsWith("da") ? "da" : "en";
}

export function resolvePreference(
  preference: Preference,
  languageTag: string | null | undefined,
): Locale {
  if (preference === "da" || preference === "en") return preference;
  return localeFromLanguageTag(languageTag);
}
