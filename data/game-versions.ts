import { c, type Copy } from "@/lib/copy";

export type VersionRow = {
  id: string;
  name: Copy;
  detail: Copy;
  confirmed: Copy;
  atCommit: Copy;
  atCommitWhen: Copy;
  note: Copy;
  known: boolean;
  /** GitHub repo whose latest push sets the date in «Spillet var på». */
  repo: string | null;
  /** Used when GitHub does not answer. */
  updatedAt: string;
};

const same = (text: string) => c(text, text);
const unknown = c("Ikke bekræftet", "Not confirmed");

export const versionRows: VersionRow[] = [
  {
    id: "chaos",
    repo: "Jeffjewett27/BoomerangFoo",
    updatedAt: "2025-12-19T12:00:00Z",
    name: same("Chaos Mod"),
    detail: same("0.5.4"),
    confirmed: same("1.3.5"),
    atCommit: same("1.3.7"),
    atCommitWhen: c("19. december 2025", "19 December 2025"),
    note: c(
      "0.5.0 er lavet til 1.3.5. 0.5.4 nævner ikke en nyere test. Committen 19. december 2025 opdaterer kun README.",
      "0.5.0 was made for 1.3.5. 0.5.4 does not name a later test. The commit of 19 December 2025 only updates the README.",
    ),
    known: true,
  },
  {
    id: "stack",
    repo: "huseinnabil1997/BoomerangFoo-ChaosMod",
    updatedAt: "2026-09-09T12:00:00Z",
    name: same("Stack-fork"),
    detail: same("0.5.6"),
    confirmed: unknown,
    atCommit: same("1.3.7"),
    atCommitWhen: c("9. september 2026", "9 September 2026"),
    note: c(
      "Readme’en nævner ingen spilversion. Zippen er fra efter 1.3.7 og før 1.4.0.",
      "The readme names no game version. The zip is from after 1.3.7 and before 1.4.0.",
    ),
    known: false,
  },
  {
    id: "eight",
    repo: "Shyngyskhan-333/boomerang-fu-8-player-mod",
    updatedAt: "2026-10-16T12:00:00Z",
    name: same("8 Player Mod"),
    detail: same("3.0.0 beta"),
    confirmed: same("1.3.6"),
    atCommit: same("1.3.7"),
    atCommitWhen: c("16. oktober 2026", "16 October 2026"),
    note: c(
      "Forfatteren har kun undersøgt 1.3.6.",
      "The author only checked 1.3.6.",
    ),
    known: true,
  },
  {
    id: "online-github",
    repo: "fraustiz/boomerang-fu-online",
    updatedAt: "2026-11-07T12:00:00Z",
    name: same("Boomerang Fu Online"),
    detail: same("2.4.1"),
    confirmed: unknown,
    atCommit: same("1.4.0"),
    atCommitWhen: c("7. november 2026", "7 November 2026"),
    note: c(
      "Udgivet 7. november 2026, efter 1.4.0. Readme’en nævner ingen spilversion.",
      "Released 7 November 2026, after 1.4.0. The readme names no game version.",
    ),
    known: false,
  },
  {
    id: "online-2",
    repo: null,
    updatedAt: "2026-07-09T12:00:00Z",
    name: c("Online, prototype 2", "Online, prototype 2"),
    detail: c("9. juli 2026", "9 July 2026"),
    confirmed: unknown,
    atCommit: same("1.3.7"),
    atCommitWhen: c("9. juli 2026", "9 July 2026"),
    note: c(
      "Skrevet i juli 2026, efter 1.3.7 og før 1.4.0.",
      "Written in July 2026, after 1.3.7 and before 1.4.0.",
    ),
    known: false,
  },
  {
    id: "team-mint",
    repo: "Nordic-maker/Boomerang-Fu-Team-Mint",
    updatedAt: "2026-11-26T21:31:19Z",
    name: same("Team Mint"),
    detail: same("1.0.0"),
    confirmed: unknown,
    atCommit: same("1.4.1"),
    atCommitWhen: c("26. november 2026", "26 November 2026"),
    note: c(
      "Readme’en nævner ingen spilversion.",
      "The readme names no game version.",
    ),
    known: false,
  },
  {
    id: "remix",
    repo: "alialyami90/BoomerangFooRemix",
    updatedAt: "2026-11-13T12:00:00Z",
    name: same("Remix"),
    detail: c("13. november 2026", "13 November 2026"),
    confirmed: unknown,
    atCommit: same("1.4.0"),
    atCommitWhen: c("13. november 2026", "13 November 2026"),
    note: c(
      "Samme grundlag som Chaos Mod. Ikke prøvet som færdig pakke.",
      "The same basis as Chaos Mod. Not tried as a finished package.",
    ),
    known: false,
  },
  {
    id: "gravity",
    repo: "acaburaz/boomerang-mods",
    updatedAt: "2026-11-13T12:00:00Z",
    name: same("Boomerang Mods"),
    detail: c("13. november 2026", "13 November 2026"),
    confirmed: unknown,
    atCommit: same("1.4.0"),
    atCommitWhen: c("13. november 2026", "13 November 2026"),
    note: c(
      "Kilde fra 13. november 2026. Samme forbehold som Chaos Mod.",
      "Source from 13 November 2026. The same caveat as Chaos Mod.",
    ),
    known: false,
  },
  {
    id: "speedrun",
    repo: "Vulcan5757/B-Fu-Speedrunning-Mod",
    updatedAt: "2026-11-25T08:10:18Z",
    name: same("Speedrun Timer"),
    detail: same("1.1.0"),
    confirmed: unknown,
    atCommit: same("1.4.1"),
    atCommitWhen: c("25. november 2026", "25 November 2026"),
    note: c(
      "info.json siger 1.1.0. Readme’en nævner ingen test.",
      "info.json says 1.1.0. The readme names no test.",
    ),
    known: false,
  },
  {
    id: "manager",
    repo: "Vulcan5757/B-Fu-Mod-Manager",
    updatedAt: "2026-11-25T08:07:50Z",
    name: same("Mod Manager"),
    detail: same("1.0.0"),
    confirmed: unknown,
    atCommit: same("1.4.1"),
    atCommitWhen: c("25. november 2026", "25 November 2026"),
    note: c(
      "info.json siger 1.0.0. Readme’en nævner ingen spilversion.",
      "info.json says 1.0.0. The readme names no game version.",
    ),
    known: false,
  },
  {
    id: "slaughter",
    repo: "william-spongberg/BoomerangFooMod",
    updatedAt: "2025-03-02T12:00:00Z",
    name: same("Slaughter House"),
    detail: same("0.4.1"),
    confirmed: c("Før 1.3.5", "Before 1.3.5"),
    atCommit: same("1.3.4"),
    atCommitWhen: c("2. marts 2025", "2 March 2025"),
    note: c(
      "Udgivet 2. marts 2025, før 1.3.5 den 28. marts 2025.",
      "Released 2 March 2025, before 1.3.5 on 28 March 2025.",
    ),
    known: true,
  },
  {
    id: "online-1",
    repo: null,
    updatedAt: "2026-06-14T12:00:00Z",
    name: c("Online, første prototype", "Online, first prototype"),
    detail: c("14. juni 2026", "14 June 2026"),
    confirmed: unknown,
    atCommit: same("1.3.7"),
    atCommitWhen: c("14. juni 2026", "14 June 2026"),
    note: c(
      "Afløst af prototypen fra juli. Ingen navngiven test.",
      "Superseded by the July prototype. No named test.",
    ),
    known: false,
  },
  {
    id: "hats",
    repo: "exp111/BoomerangFuStuff",
    updatedAt: "2022-12-23T12:00:00Z",
    name: same("Hat Loader"),
    detail: same("1.0.0"),
    confirmed: same("Unity 2019.2"),
    atCommit: same("1.2.1"),
    atCommitWhen: c("23. december 2022", "23 December 2022"),
    note: c(
      "Skrevet da spillet kørte på Unity 2019.2, før 1.3-linjen.",
      "Written when the game ran on Unity 2019.2, before the 1.3 line.",
    ),
    known: true,
  },
  {
    id: "original",
    repo: null,
    updatedAt: "2025-03-30T12:00:00Z",
    name: c("Oprindelig Chaos-mod", "Original Chaos mod"),
    detail: c("Discord", "Discord"),
    confirmed: same("1.3.5"),
    atCommit: same("1.3.5"),
    atCommitWhen: c("30. marts 2025", "30 March 2025"),
    note: c(
      "Kommentaren 30. marts 2025 omtalte en build til 1.3.5.",
      "The comment of 30 March 2025 mentioned a build for 1.3.5.",
    ),
    known: true,
  },
];
