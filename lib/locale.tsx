"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { ui } from "@/lib/messages";
import {
  LANG_COOKIE,
  resolvePreference,
  type Locale,
  type Preference,
} from "@/lib/locale-shared";

type LocaleContextValue = {
  locale: Locale;
  preference: Preference;
  setPreference: (preference: Preference) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  initialPreference,
  children,
}: {
  initialLocale: Locale;
  initialPreference: Preference;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);
  const [preference, setPreferenceState] = useState(initialPreference);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = ui[locale].metaTitle;
  }, [locale]);

  function setPreference(next: Preference) {
    const resolved =
      next === "browser" ? resolvePreference(next, navigator.language) : next;
    setPreferenceState(next);
    setLocale(resolved);
    document.cookie = `${LANG_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <LocaleContext.Provider value={{ locale, preference, setPreference }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return value;
}

export function useUi() {
  const { locale } = useLocale();
  return ui[locale];
}
