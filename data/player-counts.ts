import { c, type Copy } from "@/lib/copy";

export type PlayerRow = {
  id: string | null;
  name: Copy;
  detail: Copy;
  humans: Copy;
  bots: Copy;
  cap: Copy;
  online: Copy;
  extraHumans: boolean;
  extraBots: boolean;
  extraOnline: boolean;
};

const same = (text: string) => c(text, text);
const no = c("Nej", "No");

export const playerRows: PlayerRow[] = [
  {
    id: null,
    name: c("Spillet selv", "The game itself"),
    detail: c("uden mod", "no mod"),
    humans: same("6"),
    bots: c("Spillets egne", "The game's own"),
    cap: same("6"),
    online: no,
    extraHumans: false,
    extraBots: false,
    extraOnline: false,
  },
  {
    id: "chaos",
    name: same("Chaos Mod"),
    detail: same("0.5.4"),
    humans: same("6"),
    bots: c("Op til 11", "Up to 11"),
    cap: c("12 figurer", "12 figures"),
    online: no,
    extraHumans: false,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "remix",
    name: same("Remix"),
    detail: c("13. november 2026", "13 November 2026"),
    humans: same("6"),
    bots: c(
      "Op til 11. Afslutningen rettet 13. november",
      "Up to 11. Results fixed 13 November",
    ),
    cap: c("12 figurer", "12 figures"),
    online: no,
    extraHumans: false,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "gravity",
    name: same("Boomerang Mods"),
    detail: c("13. november 2026", "13 November 2026"),
    humans: c("Op til 8, sammen med bots", "Up to 8, shared with bots"),
    bots: c("Op til 8, sammen med mennesker", "Up to 8, shared with humans"),
    cap: same("8"),
    online: no,
    extraHumans: true,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "stack",
    name: same("Stack-fork"),
    detail: same("0.5.6"),
    humans: c("8 i repoet efter zippen", "8 in the repo after the zip"),
    bots: c("Resten af pladserne", "The remaining slots"),
    cap: same("12"),
    online: no,
    extraHumans: true,
    extraBots: true,
    extraOnline: false,
  },
  {
    id: "eight",
    name: same("8 Player Mod"),
    detail: same("3.0.0 beta"),
    humans: c("8 pladser", "8 slots"),
    bots: c("Spillets eget loft", "The game's own cap"),
    cap: same("8"),
    online: no,
    extraHumans: true,
    extraBots: false,
    extraOnline: false,
  },
  {
    id: "online-github",
    name: same("Boomerang Fu Online"),
    detail: same("2.4.1"),
    humans: c("1 pr. computer", "1 per computer"),
    bots: c("Ledige pladser af de fire", "Free slots among the four"),
    cap: c("4 over nettet", "4 over the network"),
    online: c("Ja, op til 4", "Yes, up to 4"),
    extraHumans: false,
    extraBots: false,
    extraOnline: true,
  },
  {
    id: "online-2",
    name: c("Online, prototype 2", "Online, prototype 2"),
    detail: c("9. juli 2026", "9 July 2026"),
    humans: c("Flere på samme maskine", "Several on one machine"),
    bots: c("Ja, antal ikke oplyst", "Yes, count not stated"),
    cap: c("Ikke oplyst", "Not stated"),
    online: c("Ja", "Yes"),
    extraHumans: true,
    extraBots: true,
    extraOnline: true,
  },
];
