"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { lineage, mods } from "@/data/mods";
import { statusLabel, statusTone } from "@/components/status-tone";
import { localize } from "@/lib/copy";
import { useLocale, useUi } from "@/lib/locale";

type ViewMod = ReturnType<typeof localize<typeof mods>>[number];

type TreeNode = {
  mod: ViewMod;
  relation: string | null;
  children: TreeNode[];
};

function branch(
  id: string,
  modList: ViewMod[],
  lineageList: ReturnType<typeof localize<typeof lineage>>,
): TreeNode {
  const mod = modList.find((item) => item.id === id);
  if (!mod) {
    throw new Error(`Unknown mod in the family tree: ${id}`);
  }
  const entry = lineageList.find((item) => item.id === id);
  const children = lineageList
    .filter((item) => item.basedOn === id)
    .map((item) => branch(item.id, modList, lineageList));
  return { mod, relation: entry?.relation ?? null, children };
}

export function LineageTree({
  matchIds,
  filtersActive,
  onOpen,
}: {
  matchIds: Set<string>;
  filtersActive: boolean;
  onOpen: (id: string) => void;
}) {
  const { locale } = useLocale();
  const m = useUi();
  const copy = useMemo(() => localize(locale, { mods, lineage }), [locale]);
  const groups = [
    {
      id: "chaos",
      title: m.chaosFamily,
      summary: m.chaosFamilySummary,
      rootIds: ["original"],
    },
    {
      id: "online",
      title: m.onlineFamily,
      summary: m.onlineFamilySummary,
      rootIds: ["online-1", "online-github"],
    },
    {
      id: "solo",
      title: m.soloFamily,
      summary: m.soloFamilySummary,
      rootIds: ["eight", "hats", "speedrun"],
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      {groups.map((group) => (
        <section key={group.id} className="rounded-2xl border bg-card/90 p-4 shadow-sm sm:p-6">
          <h2 className="font-heading text-2xl font-medium">{group.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {group.summary}
          </p>
          <div className="mt-5 space-y-6">
            {group.rootIds.map((rootId) => (
              <TreeList
                key={rootId}
                nodes={[branch(rootId, copy.mods, copy.lineage)]}
                nested={false}
                matchIds={matchIds}
                filtersActive={filtersActive}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      ))}
      {filtersActive ? (
        <p className="text-sm text-muted-foreground">
          {m.treeDimmed}
        </p>
      ) : null}
    </div>
  );
}

function TreeList({
  nodes,
  nested,
  matchIds,
  filtersActive,
  onOpen,
}: {
  nodes: TreeNode[];
  nested: boolean;
  matchIds: Set<string>;
  filtersActive: boolean;
  onOpen: (id: string) => void;
}) {
  const { locale } = useLocale();
  const m = useUi();
  return (
    <ul className={nested ? "relative mt-1" : "space-y-4"}>
      {nested ? (
        <span
          aria-hidden
          className="absolute -top-1 left-0 h-4 w-px bg-[oklch(0.72_0.04_70)]"
        />
      ) : null}
      {nodes.map((node, index) => {
        const last = index === nodes.length - 1;
        const matches = matchIds.has(node.mod.id);
        return (
          <li key={node.mod.id} className={nested ? "relative pl-6 sm:pl-8" : ""}>
            {nested ? (
              <>
                <span
                  aria-hidden
                  className={
                    "absolute top-0 left-0 w-px bg-[oklch(0.72_0.04_70)] " +
                    (last ? "h-5" : "bottom-0")
                  }
                />
                <span
                  aria-hidden
                  className="absolute top-5 left-0 h-px w-6 bg-[oklch(0.72_0.04_70)] sm:w-8"
                />
              </>
            ) : null}
            <div className={nested ? "pt-3" : ""}>
              {node.relation ? (
                <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
                  {node.relation}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => onOpen(node.mod.id)}
                className={
                  "mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-left shadow-sm transition hover:border-primary/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none " +
                  (filtersActive && matches ? "ring-2 ring-primary " : "") +
                  (filtersActive && !matches ? "opacity-45 " : "")
                }
              >
                <span className="flex flex-wrap items-center gap-2">
                  <Badge className={statusTone[node.mod.status]}>
                    {statusLabel(node.mod.status, locale)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{node.mod.version}</span>
                </span>
                <span className="font-heading mt-1.5 block text-xl leading-snug font-medium">
                  {node.mod.name}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {node.mod.authors}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {m.checked(node.mod.updatedLabel)}
                </span>
                {node.mod.updateNote ? (
                  <span className="mt-1 block text-xs leading-relaxed text-foreground/70">
                    {node.mod.updateNote}
                  </span>
                ) : null}
              </button>
              {node.children.length > 0 ? (
                <TreeList
                  nodes={node.children}
                  nested
                  matchIds={matchIds}
                  filtersActive={filtersActive}
                  onOpen={onOpen}
                />
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
