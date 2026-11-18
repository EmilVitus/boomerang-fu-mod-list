export const chaosColumns = [
  { id: "slaughter", label: "Slaughter", detail: "0.4.1" },
  { id: "chaos", label: "Chaos", detail: "0.5.4" },
  { id: "stack", label: "Stack", detail: "0.5.6" },
  { id: "remix", label: "Remix", detail: "kilde" },
  { id: "gravity", label: "Boomerang Mods", detail: "13. nov." },
] as const;

export type ChaosColumnId = (typeof chaosColumns)[number]["id"];

/** ja: kilden nævner den. nej: udgaven har den ikke.
 *  ukendt: kilden siger det ikke.
 *  delt: Remix giver mennesker og bots hver deres sæt.
 *  efter-zip: commit’et 9. september 2026, efter 0.5.6-zippen.
 */
export type FeatureCell = "ja" | "nej" | "ukendt" | "delt" | "efter-zip";

export type FeatureRow = {
  name: string;
  cells: Record<ChaosColumnId, FeatureCell>;
};

export type FeatureGroup = {
  title: string;
  rows: FeatureRow[];
};

function row(name: string, cells: FeatureCell[]): FeatureRow {
  const [slaughter, chaos, stack, remix, gravity] = cells;
  return {
    name,
    cells: { slaughter, chaos, stack, remix, gravity },
  };
}

export const chaosFeatureGroups: FeatureGroup[] = [
  {
    title: "Spiltilstande",
    rows: [
      row("Power Drain", ["ja", "ja", "ja", "ja", "ja"]),
      row("Juggernaut", ["ja", "ja", "ja", "ja", "ja"]),
      row("Survive 'Till Dawn", ["ja", "ja", "ja", "ja", "ja"]),
      row("Team Golden", ["ja", "ja", "ja", "ja", "ja"]),
      row("Slaughter House", ["ja", "nej", "nej", "nej", "ja"]),
      row("Russian Roulette", ["nej", "nej", "nej", "ja", "nej"]),
    ],
  },
  {
    title: "Kampindstillinger",
    rows: [
      row("Kampens længde", ["ja", "ja", "ja", "ja", "ja"]),
      row("Hurtigere powerup-spawn", ["ja", "ja", "ja", "ja", "ja"]),
      row("Maks. antal powerups", ["ja", "ja", "ja", "ja", "ja"]),
      row("Start-powerups", ["ja", "ja", "ja", "delt", "ja"]),
      row("Hoppende boomeranger", ["ja", "ja", "ja", "ja", "ja"]),
      row("Boomerang-størrelse", ["ja", "ja", "ja", "ja", "ja"]),
      row("Spilhastighed, 10–500 %", ["nej", "ja", "ja", "ja", "ja"]),
      row("Sudden death-tider", ["nej", "ja", "ja", "ja", "ja"]),
      row("Knockback", ["nej", "ja", "ja", "ja", "ja"]),
      row("Uden boomeranger", ["nej", "ja", "ja", "ja", "ja"]),
      row("Spillets banevalg fra 1.3.5", ["nej", "ja", "ja", "ja", "ukendt"]),
    ],
  },
  {
    title: "Powerups",
    rows: [
      row("Modifiers i menuen", ["ja", "ja", "ja", "ja", "ja"]),
      row("Gravity Well", ["nej", "nej", "nej", "nej", "ja"]),
      row("Separate loot-puljer", ["nej", "nej", "nej", "ja", "nej"]),
      row("Spawn-vægte", ["nej", "nej", "nej", "ja", "nej"]),
      row("Stack samme powerup", ["nej", "nej", "ja", "nej", "nej"]),
      row("Book gacha", ["nej", "nej", "ja", "nej", "nej"]),
      row("Max Books", ["nej", "nej", "ja", "nej", "nej"]),
      row("Powerups i hjørnerne", ["nej", "nej", "nej", "ja", "nej"]),
      row("Kampstatistik", ["nej", "nej", "nej", "ja", "nej"]),
    ],
  },
  {
    title: "Spillere",
    rows: [
      row("Op til 11 bots", ["nej", "ja", "ja", "ja", "nej"]),
      row("Otte lokale controllere", ["nej", "nej", "efter-zip", "nej", "nej"]),
      row("Loft på 8 i alt", ["nej", "nej", "nej", "nej", "ja"]),
      row("Afslutningsskærm til 12", ["nej", "nej", "ja", "nej", "nej"]),
      row("Impossible-bots", ["ja", "ja", "ja", "ja", "ukendt"]),
    ],
  },
  {
    title: "Omkring menuen",
    rows: [
      row("Indstillinger i spillets menu", ["ja", "ja", "ja", "ja", "ja"]),
      row("Oversættelse via JSON", ["nej", "ja", "ja", "ja", "ja"]),
      row("Debug med F1", ["ja", "ja", "ja", "ja", "ja"]),
    ],
  },
];

export const featureCellLabel: Record<FeatureCell, string> = {
  ja: "Ja",
  nej: "Nej",
  ukendt: "Ukendt",
  delt: "Delt",
  "efter-zip": "Efter zippen",
};
