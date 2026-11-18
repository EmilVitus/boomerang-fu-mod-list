import { cookies, headers } from "next/headers";

import {
  isPreference,
  LANG_COOKIE,
  resolvePreference,
  type Locale,
  type Preference,
} from "@/lib/locale-shared";

export async function getRequestLocale(): Promise<{
  locale: Locale;
  preference: Preference;
}> {
  const jar = await cookies();
  const raw = jar.get(LANG_COOKIE)?.value;
  const preference: Preference = isPreference(raw) ? raw : "browser";
  const accept = (await headers()).get("accept-language");
  return { preference, locale: resolvePreference(preference, accept) };
}
