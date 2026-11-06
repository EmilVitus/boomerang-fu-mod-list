import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Boomerang Fu-mods til Windows",
  description:
    "Katalog over offentlige Boomerang Fu-mods til Windows: Chaos Mod, stack-fork, otte spillere, online-prototyper og hatte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${sourceSans.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
