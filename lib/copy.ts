import type { Locale } from "@/lib/locale-shared";

export type Copy = {
  da: string;
  en: string;
};

export function c(da: string, en: string): Copy {
  return { da, en };
}

function isCopy(value: unknown): value is Copy {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.da === "string" &&
    typeof record.en === "string" &&
    Object.keys(record).length === 2
  );
}

type Localized<T> = T extends Copy
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

export function localize<T>(locale: Locale, value: T): Localized<T> {
  if (isCopy(value)) return value[locale] as Localized<T>;
  if (Array.isArray(value)) {
    return value.map((item) => localize(locale, item)) as Localized<T>;
  }
  if (value !== null && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      output[key] = localize(locale, item);
    }
    return output as Localized<T>;
  }
  return value as Localized<T>;
}
