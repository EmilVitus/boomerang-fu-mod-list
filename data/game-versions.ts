import { c, type Copy } from "@/lib/copy";

export const currentGame = c(
  "1.4.1 fra 19. november 2026",
  "1.4.1 from 19 November 2026",
);

export type VersionRow = {
  id: string;
  name: Copy;
  detail: Copy;
  confirmed: Copy;
  note: Copy;
  known: boolean;
};

const same = (text: string) => c(text, text);
const unknown = c("Ikke bekræftet", "Not confirmed");

export const versionRows: VersionRow[] = [
  {
    id: "chaos",
    name: same("Chaos Mod"),
    detail: same("0.5.4"),
    confirmed: same("1.3.5"),
    note: c(
      "0.5.0 er lavet til 1.3.5. 0.5.4 nævner ikke en nyere test.",
      "0.5.0 was made for 1.3.5. 0.5.4 does not name a later test.",
    ),
    known: true,
  },
  {
    id: "stack",
    name: same("Stack-fork"),
    detail: same("0.5.6"),
    confirmed: unknown,
    note: c(
      "Readme’en nævner ingen spilversion. Zippen er fra efter 1.3.7 og før 1.4.0.",
      "The readme names no game version. The zip is from after 1.3.7 and before 1.4.0.",
    ),
    known: false,
  },
  {
    id: "eight",
    name: same("8 Player Mod"),
    detail: same("3.0.0 beta"),
    confirmed: same("1.3.6"),
    note: c(
      "Forfatteren har kun undersøgt 1.3.6.",
      "The author only checked 1.3.6.",
    ),
    known: true,
  },
  {
    id: "online-github",
    name: same("Boomerang Fu Online"),
    detail: same("2.4.1"),
    confirmed: unknown,
    note: c(
      "Udgivet 7. november 2026, efter 1.4.0. Readme’en nævner ingen spilversion.",
      "Released 7 November 2026, after 1.4.0. The readme names no game version.",
    ),
    known: false,
  },
  {
    id: "online-2",
    name: c("Online, prototype 2", "Online, prototype 2"),
    detail: c("9. juli 2026", "9 July 2026"),
    confirmed: unknown,
    note: c(
      "Skrevet i juli 2026, efter 1.3.7 og før 1.4.0.",
      "Written in July 2026, after 1.3.7 and before 1.4.0.",
    ),
    known: false,
  },
  {
    id: "remix",
    name: same("Remix"),
    detail: c("13. november 2026", "13 November 2026"),
    confirmed: unknown,
    note: c(
      "Samme grundlag som Chaos Mod. Ikke prøvet som færdig pakke.",
      "The same basis as Chaos Mod. Not tried as a finished package.",
    ),
    known: false,
  },
  {
    id: "gravity",
    name: same("Boomerang Mods"),
    detail: c("13. november 2026", "13 November 2026"),
    confirmed: unknown,
    note: c(
      "Kilde fra 13. november 2026. Samme forbehold som Chaos Mod.",
      "Source from 13 November 2026. The same caveat as Chaos Mod.",
    ),
    known: false,
  },
  {
    id: "speedrun",
    name: same("Speedrun Timer"),
    detail: c("13. november 2026", "13 November 2026"),
    confirmed: unknown,
    note: c(
      "Repoet nævner ingen spilversion.",
      "The repo names no game version.",
    ),
    known: false,
  },
  {
    id: "slaughter",
    name: same("Slaughter House"),
    detail: same("0.4.1"),
    confirmed: c("Før 1.3.5", "Before 1.3.5"),
    note: c(
      "Udgivet 2. marts 2025, før 1.3.5 den 28. marts 2025.",
      "Released 2 March 2025, before 1.3.5 on 28 March 2025.",
    ),
    known: true,
  },
  {
    id: "online-1",
    name: c("Online, første prototype", "Online, first prototype"),
    detail: c("14. juni 2026", "14 June 2026"),
    confirmed: unknown,
    note: c(
      "Afløst af prototypen fra juli. Ingen navngiven test.",
      "Superseded by the July prototype. No named test.",
    ),
    known: false,
  },
  {
    id: "hats",
    name: same("Hat Loader"),
    detail: same("1.0.0"),
    confirmed: same("Unity 2019.2"),
    note: c(
      "Skrevet da spillet kørte på Unity 2019.2, før 1.3-linjen.",
      "Written when the game ran on Unity 2019.2, before the 1.3 line.",
    ),
    known: true,
  },
  {
    id: "original",
    name: c("Oprindelig Chaos-mod", "Original Chaos mod"),
    detail: c("Discord", "Discord"),
    confirmed: same("1.3.5"),
    note: c(
      "Kommentaren 30. marts 2025 omtalte en build til 1.3.5.",
      "The comment of 30 March 2025 mentioned a build for 1.3.5.",
    ),
    known: true,
  },
];
