import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";

import { LocaleProvider } from "@/lib/locale";
import { ui } from "@/lib/messages";
import { getRequestLocale } from "@/lib/request-locale";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLocale();
  return {
    title: ui[locale].metaTitle,
    description: ui[locale].metaDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, preference } = await getRequestLocale();
  return (
    <html lang={locale}>
      <body className={`${sourceSans.variable} ${fraunces.variable} antialiased`}>
        <LocaleProvider initialLocale={locale} initialPreference={preference}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
