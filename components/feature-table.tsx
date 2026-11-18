"use client";

import { Fragment } from "react";

import {
  chaosColumns,
  chaosFeatureGroups,
  featureCellLabel,
  type FeatureCell,
} from "@/data/chaos-features";
import { playerRows } from "@/data/player-counts";

const cellClass: Record<FeatureCell, string> = {
  ja: "bg-primary/15 text-primary font-medium",
  nej: "text-muted-foreground",
  ukendt: "text-muted-foreground italic",
  delt: "bg-[oklch(0.93_0.04_85)] font-medium text-[oklch(0.4_0.08_55)]",
  "efter-zip": "bg-[oklch(0.93_0.04_200)] font-medium text-[oklch(0.4_0.06_210)]",
};

const raisedClass = "bg-primary/15 font-medium text-primary";

export function FeatureTable({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <>
    <section id="chaos-funktioner" className="mt-12 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      <h2 className="font-heading text-2xl font-medium">Chaos-familiens funktioner</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Discord-kolonnen følger opslaget fra 16. september 2024. Det nævner tre nye
        spiltilstande uden navne, så de fire navngivne tilstande står som ukendt dér.
        Stack og Remix har Chaos Mods funktioner fra 0.5.4 med, fordi de commits
        ligger i deres historik. Delt betyder, at Remix giver mennesker og bots hver
        deres sæt. Efter zippen er otte controllere, commit’et 9. september 2026,
        efter 0.5.6-zippen fra 15. august.
      </p>
      <div className="mt-4 max-h-[70vh] overflow-auto rounded-xl border">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">
            Hvilke funktioner Discord-modden, Slaughter House 0.4.1, Chaos Mod 0.5.4,
            stack-forken 0.5.6 og Remix har.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-30 bg-card px-3 py-3 text-left font-medium"
              >
                Funktion
              </th>
              {chaosColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="sticky top-0 z-20 bg-card px-2 py-3 text-center font-medium"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(column.id)}
                    className="rounded-md px-1 py-0.5 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span className="block">{column.label}</span>
                    <span className="block text-xs font-normal text-muted-foreground">
                      {column.detail}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chaosFeatureGroups.map((group) => (
              <Fragment key={group.title}>
                <tr>
                  <th
                    colSpan={chaosColumns.length + 1}
                    scope="colgroup"
                    className="bg-muted/70 px-3 py-2 text-left font-heading text-base font-medium"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((feature) => (
                  <tr key={feature.name} className="border-t">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-t bg-card px-3 py-2 text-left font-normal"
                    >
                      {feature.name}
                    </th>
                    {chaosColumns.map((column) => {
                      const cell = feature.cells[column.id];
                      return (
                        <td
                          key={column.id}
                          className={`border-t px-2 py-2 text-center ${cellClass[cell]}`}
                        >
                          {featureCellLabel[cell]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section id="ekstra-spillere" className="mt-6 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      <h2 className="font-heading text-2xl font-medium">Ekstra spillere</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Spillet har seks lokale mennesker. Farvede celler er det, modden lægger oveni.
        Chaos Mod og Remix fylder de ekstra pladser med bots. 8 Player Mod lægger to
        menneskepladser til og lader bot-loftet være. Stack-forken har begge dele i
        koden: otte controllere blev commit’et 9. september 2026, efter 0.5.6-zippen,
        som allerede nævner en lobby til 12. Fysiske controllere 7 og 8 er ikke testet
        i 8 Player Mod. Bot-kampe er.
      </p>
      <div className="mt-4 overflow-auto rounded-xl border">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">
            Hvor mange lokale mennesker, bots og netværksspillere hver mod lægger til.
          </caption>
          <thead>
            <tr>
              {["Mod", "Mennesker ved skærmen", "Bots", "Samlet loft", "Over nettet"].map(
                (label, index) => (
                  <th
                    key={label}
                    scope="col"
                    className={
                      "sticky top-0 bg-card px-3 py-3 text-left font-medium " +
                      (index === 0 ? "left-0 z-30" : "z-20")
                    }
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {playerRows.map((row) => (
              <tr key={row.name}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t bg-card px-3 py-2 text-left font-normal"
                >
                  {row.id ? (
                    <button
                      type="button"
                      onClick={() => row.id && onOpen(row.id)}
                      className="rounded-md text-left hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span className="block font-medium">{row.name}</span>
                      <span className="block text-xs text-muted-foreground">{row.detail}</span>
                    </button>
                  ) : (
                    <>
                      <span className="block font-medium">{row.name}</span>
                      <span className="block text-xs text-muted-foreground">{row.detail}</span>
                    </>
                  )}
                </th>
                <td className={`border-t px-3 py-2 ${row.extraHumans ? raisedClass : ""}`}>
                  {row.humans}
                </td>
                <td className={`border-t px-3 py-2 ${row.extraBots ? raisedClass : ""}`}>
                  {row.bots}
                </td>
                <td className="border-t px-3 py-2">{row.cap}</td>
                <td className={`border-t px-3 py-2 ${row.extraOnline ? raisedClass : ""}`}>
                  {row.online}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
}
