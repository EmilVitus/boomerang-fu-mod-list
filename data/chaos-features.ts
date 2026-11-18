import { c, type Copy } from "@/lib/copy";

export const chaosColumns = [
  { id: "slaughter", label: "Slaughter", detail: c("0.4.1", "0.4.1") },
  { id: "chaos", label: "Chaos", detail: c("0.5.4", "0.5.4") },
  { id: "stack", label: "Stack", detail: c("0.5.6", "0.5.6") },
  { id: "remix", label: "Remix", detail: c("kilde", "source") },
  { id: "gravity", label: "Boomerang Mods", detail: c("13. nov.", "13 Nov") },
] as const;

export type ChaosColumnId = (typeof chaosColumns)[number]["id"];

/** ja: the source mentions it. nej: the edition does not have it.
 *  ukendt: the source does not say.
 *  delt: Remix gives humans and bots a set each.
 *  efter-zip: committed 9 September 2026, after the 0.5.6 zip.
 */
export type FeatureCell = "ja" | "nej" | "ukendt" | "delt" | "efter-zip";

export type FeatureRow = {
  name: Copy;
  cells: Record<ChaosColumnId, FeatureCell>;
};

export type FeatureGroup = {
  title: Copy;
  rows: FeatureRow[];
};

function row(name: Copy, cells: FeatureCell[]): FeatureRow {
  const [slaughter, chaos, stack, remix, gravity] = cells;
  return {
    name,
    cells: { slaughter, chaos, stack, remix, gravity },
  };
}

const same = (text: string) => c(text, text);

export const chaosFeatureGroups: FeatureGroup[] = [
  {
    title: c("Spiltilstande", "Game modes"),
    rows: [
      row(same("Power Drain"), ["ja", "ja", "ja", "ja", "ja"]),
      row(same("Juggernaut"), ["ja", "ja", "ja", "ja", "ja"]),
      row(same("Survive 'Till Dawn"), ["ja", "ja", "ja", "ja", "ja"]),
      row(same("Team Golden"), ["ja", "ja", "ja", "ja", "ja"]),
      row(same("Slaughter House"), ["ja", "nej", "nej", "nej", "ja"]),
      row(same("Russian Roulette"), ["nej", "nej", "nej", "ja", "nej"]),
    ],
  },
  {
    title: c("Kampindstillinger", "Match settings"),
    rows: [
      row(c("Kampens længde", "Match length"), ["ja", "ja", "ja", "ja", "ja"]),
      row(c("Hurtigere powerup-spawn", "Faster powerup spawn"), ["ja", "ja", "ja", "ja", "ja"]),
      row(c("Maks. antal powerups", "Max powerups"), ["ja", "ja", "ja", "ja", "ja"]),
      row(c("Start-powerups", "Starting powerups"), ["ja", "ja", "ja", "delt", "ja"]),
      row(c("Hoppende boomeranger", "Bouncy boomerangs"), ["ja", "ja", "ja", "ja", "ja"]),
      row(c("Boomerang-størrelse", "Boomerang size"), ["ja", "ja", "ja", "ja", "ja"]),
      row(c("Spilhastighed, 10–500 %", "Game speed, 10–500%"), ["nej", "ja", "ja", "ja", "ja"]),
      row(c("Sudden death-tider", "Sudden death times"), ["nej", "ja", "ja", "ja", "ja"]),
      row(same("Knockback"), ["nej", "ja", "ja", "ja", "ja"]),
      row(c("Uden boomeranger", "No boomerangs"), ["nej", "ja", "ja", "ja", "ja"]),
      row(c("Spillets banevalg fra 1.3.5", "In-game map selection from 1.3.5"), [
        "nej",
        "ja",
        "ja",
        "ja",
        "ukendt",
      ]),
    ],
  },
  {
    title: same("Powerups"),
    rows: [
      row(c("Modifiers i menuen", "Modifiers in the menu"), ["ja", "ja", "ja", "ja", "ja"]),
      row(same("Gravity Well"), ["nej", "nej", "nej", "nej", "ja"]),
      row(c("Separate loot-puljer", "Separate loot pools"), ["nej", "nej", "nej", "ja", "nej"]),
      row(c("Spawn-vægte", "Spawn weights"), ["nej", "nej", "nej", "ja", "nej"]),
      row(c("Stack samme powerup", "Stack the same powerup"), ["nej", "nej", "ja", "nej", "nej"]),
      row(same("Book gacha"), ["nej", "nej", "ja", "nej", "nej"]),
      row(same("Max Books"), ["nej", "nej", "ja", "nej", "nej"]),
      row(c("Powerups i hjørnerne", "Powerups in the corners"), ["nej", "nej", "nej", "ja", "nej"]),
      row(c("Kampstatistik", "Match stats"), ["nej", "nej", "nej", "ja", "nej"]),
    ],
  },
  {
    title: c("Spillere", "Players"),
    rows: [
      row(c("Op til 11 bots", "Up to 11 bots"), ["nej", "ja", "ja", "ja", "nej"]),
      row(c("Otte lokale controllere", "Eight local controllers"), [
        "nej",
        "nej",
        "efter-zip",
        "nej",
        "nej",
      ]),
      row(c("Loft på 8 i alt", "Cap of 8 in total"), ["nej", "nej", "nej", "nej", "ja"]),
      row(c("Afslutningsskærm til 12", "Results screen for 12"), ["nej", "nej", "ja", "nej", "nej"]),
      row(c("Impossible-bots", "Impossible bots"), ["ja", "ja", "ja", "ja", "ukendt"]),
    ],
  },
  {
    title: c("Omkring menuen", "Around the menu"),
    rows: [
      row(c("Indstillinger i spillets menu", "Settings in the game menu"), [
        "ja",
        "ja",
        "ja",
        "ja",
        "ja",
      ]),
      row(c("Oversættelse via JSON", "Translation via JSON"), ["nej", "ja", "ja", "ja", "ja"]),
      row(c("Debug med F1", "Debug with F1"), ["ja", "ja", "ja", "ja", "ja"]),
    ],
  },
];

export const featureCellLabel: Record<FeatureCell, Copy> = {
  ja: c("Ja", "Yes"),
  nej: c("Nej", "No"),
  ukendt: c("Ukendt", "Unknown"),
  delt: c("Delt", "Split"),
  "efter-zip": c("Efter zippen", "After the zip"),
};
