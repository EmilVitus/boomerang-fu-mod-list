"use client";

import { Fragment, useMemo, useState } from "react";

import {
  chaosColumns,
  chaosFeatureGroups,
  featureCellLabel,
  type FeatureCell,
} from "@/data/chaos-features";
import { versionRows } from "@/data/game-versions";
import { pointRank } from "@/lib/game-clock";
import type { LiveVersions } from "@/lib/live-versions";
import { playerRows } from "@/data/player-counts";
import { Button } from "@/components/ui/button";
import { localize } from "@/lib/copy";
import { useLocale, useUi } from "@/lib/locale";

const cellClass: Record<FeatureCell, string> = {
  ja: "bg-primary/15 text-primary font-medium",
  nej: "text-muted-foreground",
  ukendt: "text-muted-foreground italic",
  delt: "bg-[oklch(0.93_0.04_85)] font-medium text-[oklch(0.4_0.08_55)]",
  "efter-zip": "bg-[oklch(0.93_0.04_200)] font-medium text-[oklch(0.4_0.06_210)]",
};

const raisedClass = "bg-primary/15 font-medium text-primary";

type VersionSort = "standard" | "oldest" | "newest";

function formatDay(iso: string, locale: "da" | "en") {
  return new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", {
    timeZone: "Europe/Copenhagen",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function wasOnLabel(version: string, unnamedAfter: string | null, locale: "da" | "en") {
  if (!unnamedAfter) return version;
  return locale === "da" ? `Nyere end ${unnamedAfter}` : `Newer than ${unnamedAfter}`;
}

export function FeatureTable({ onOpen }: { onOpen: (id: string) => void }) {
  const { locale } = useLocale();
  const m = useUi();
  const copy = useMemo(
    () => localize(locale, { chaosColumns, chaosFeatureGroups, featureCellLabel, playerRows }),
    [locale],
  );

  return (
    <>
    <section id="chaos-funktioner" className="mt-12 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      <h2 className="font-heading text-2xl font-medium">{m.chaosTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{m.chaosIntro}</p>
      <div className="mt-4 max-h-[70vh] overflow-auto rounded-xl border">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">{m.chaosCaption}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-30 bg-card px-3 py-3 text-left font-medium"
              >
                {m.featureColumn}
              </th>
              {copy.chaosColumns.map((column) => (
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
            {copy.chaosFeatureGroups.map((group) => (
              <Fragment key={group.title}>
                <tr>
                  <th
                    colSpan={copy.chaosColumns.length + 1}
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
                    {copy.chaosColumns.map((column) => {
                      const cell = feature.cells[column.id];
                      return (
                        <td
                          key={column.id}
                          className={`border-t px-2 py-2 text-center ${cellClass[cell]}`}
                        >
                          {copy.featureCellLabel[cell]}
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
      <h2 className="font-heading text-2xl font-medium">{m.playersTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{m.playersIntro}</p>
      <div className="mt-4 overflow-auto rounded-xl border">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">{m.playersCaption}</caption>
          <thead>
            <tr>
              {m.playerHeaders.map(
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
            {copy.playerRows.map((row) => (
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

export function GameVersionTable({
  onOpen,
  live,
}: {
  onOpen: (id: string) => void;
  live: LiveVersions;
}) {
  const { locale } = useLocale();
  const m = useUi();
  const [versionSort, setVersionSort] = useState<VersionSort>("standard");
  const copy = useMemo(() => localize(locale, { versionRows }), [locale]);
  const rows = useMemo(() => {
    const withLive = copy.versionRows.map((row) => {
      const cell = live.rows[row.id];
      return {
        ...row,
        atCommit: cell ? wasOnLabel(cell.version, cell.unnamedAfter, locale) : row.atCommit,
        atCommitWhen: cell ? formatDay(cell.at, locale) : row.atCommitWhen,
        sortRank: cell ? pointRank(cell) : pointRank({ version: row.atCommit, unnamedAfter: null }),
      };
    });
    if (versionSort === "standard") return withLive;
    const direction = versionSort === "oldest" ? 1 : -1;
    return withLive
      .map((row, index) => ({ row, index }))
      .sort((a, b) => direction * (a.row.sortRank - b.row.sortRank) || a.index - b.index)
      .map((item) => item.row);
  }, [copy.versionRows, live.rows, locale, versionSort]);
  const current = live.current;
  const currentLabel = `${wasOnLabel(current.version, current.unnamedAfter, locale)} ${
    locale === "da" ? "fra" : "from"
  } ${formatDay(current.at, locale)}`;

  return (
    <section id="spilversion" className="mt-12 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      <h2 className="font-heading text-2xl font-medium">{m.versionsTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {m.versionsIntro(currentLabel)} {live.steam && live.github ? m.versionsLive : m.versionsStale}{" "}
        {current.unnamedAfter ? m.versionsUnnamed(current.unnamedAfter) : null}
        {current.silent && !current.unnamedAfter ? m.versionsSilent(current.version) : null}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start">
        <p id="spilversion-sortering" className="w-24 shrink-0 pt-1.5 text-sm font-medium text-muted-foreground">
          {m.filterSort}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="spilversion-sortering">
          {(
            [
              ["standard", m.versionSortStandard],
              ["oldest", m.versionSortOldest],
              ["newest", m.versionSortNewest],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={versionSort === id ? "default" : "outline"}
              aria-pressed={versionSort === id}
              onClick={() => setVersionSort(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-auto rounded-xl border">
        <table className="w-full min-w-[56rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">{m.versionsCaption}</caption>
          <thead>
            <tr>
              {m.versionHeaders.map((label, index) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t bg-card px-3 py-2 text-left font-normal"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(row.id)}
                    className="rounded-md text-left hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span className="block font-medium">{row.name}</span>
                    <span className="block text-xs text-muted-foreground">{row.detail}</span>
                  </button>
                </th>
                <td
                  className={
                    "border-t px-3 py-2 " + (row.known ? "font-medium" : "text-muted-foreground italic")
                  }
                >
                  {row.confirmed}
                </td>
                <td className="border-t px-3 py-2">
                  <span className="block font-medium">{row.atCommit}</span>
                  <span className="block text-xs text-muted-foreground">{row.atCommitWhen}</span>
                </td>
                <td className="border-t px-3 py-2 text-muted-foreground">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
