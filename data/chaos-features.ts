export const chaosColumns = [
  { id: "original", label: "Discord", detail: "2024" },
  { id: "slaughter", label: "Slaughter", detail: "0.4.1" },
  { id: "chaos", label: "Chaos", detail: "0.5.4" },
  { id: "stack", label: "Stack", detail: "0.5.6" },
  { id: "remix", label: "Remix", detail: "kilde" },
] as const;

export type ChaosColumnId = (typeof chaosColumns)[number]["id"];

/** ja: kilden nævner den. nej: udgaven stopper før funktionen fandtes.
 *  ukendt: Discord-opslaget er for kort til at afgøre det.
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
  const [original, slaughter, chaos, stack, remix] = cells;
  return {
    name,
    cells: { original, slaughter, chaos, stack, remix },
  };
}

export const chaosFeatureGroups: FeatureGroup[] = [
  {
    title: "Spiltilstande",
    rows: [
      row("Power Drain", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Juggernaut", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Survive 'Till Dawn", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Team Golden", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Slaughter House", ["nej", "ja", "nej", "nej", "nej"]),
      row("Russian Roulette", ["nej", "nej", "nej", "nej", "ja"]),
    ],
  },
  {
    title: "Kampindstillinger",
    rows: [
      row("Kampens længde", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Hurtigere powerup-spawn", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Maks. antal powerups", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Start-powerups", ["ukendt", "ja", "ja", "ja", "delt"]),
      row("Hoppende boomeranger", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Boomerang-størrelse", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Spilhastighed, 10–500 %", ["nej", "nej", "ja", "ja", "ja"]),
      row("Sudden death-tider", ["nej", "nej", "ja", "ja", "ja"]),
      row("Knockback", ["nej", "nej", "ja", "ja", "ja"]),
      row("Uden boomeranger", ["nej", "nej", "ja", "ja", "ja"]),
      row("Eget banekort", ["ja", "nej", "nej", "nej", "nej"]),
      row("Spillets banevalg fra 1.3.5", ["ukendt", "nej", "ja", "ja", "ja"]),
      row("Kamera-modifiers", ["ja", "ukendt", "ukendt", "ukendt", "ukendt"]),
    ],
  },
  {
    title: "Powerups",
    rows: [
      row("Modifiers i menuen", ["ukendt", "ja", "ja", "ja", "ja"]),
      row("Separate loot-puljer", ["nej", "nej", "nej", "nej", "ja"]),
      row("Spawn-vægte", ["nej", "nej", "nej", "nej", "ja"]),
      row("Stack samme powerup", ["nej", "nej", "nej", "ja", "nej"]),
      row("Book gacha", ["nej", "nej", "nej", "ja", "nej"]),
      row("Max Books", ["nej", "nej", "nej", "ja", "nej"]),
      row("Powerups i hjørnerne", ["nej", "nej", "nej", "nej", "ja"]),
      row("Kampstatistik", ["nej", "nej", "nej", "nej", "ja"]),
    ],
  },
  {
    title: "Spillere",
    rows: [
      row("Op til 11 bots", ["nej", "nej", "ja", "ja", "ja"]),
      row("Otte lokale controllere", ["nej", "nej", "nej", "efter-zip", "nej"]),
      row("Afslutningsskærm til 12", ["nej", "nej", "nej", "ja", "nej"]),
      row("Impossible-bots", ["ukendt", "ja", "ja", "ja", "ja"]),
    ],
  },
  {
    title: "Omkring menuen",
    rows: [
      row("Indstillinger i spillets menu", ["nej", "ja", "ja", "ja", "ja"]),
      row("Oversættelse via JSON", ["ukendt", "nej", "ja", "ja", "ja"]),
      row("Debug med F1", ["ukendt", "ja", "ja", "ja", "ja"]),
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
