"use client";

import { Badge } from "@/components/ui/badge";
import { lineage, mods, type ModEntry } from "@/data/mods";
import { statusLabel, statusTone } from "@/components/status-tone";

type TreeNode = {
  mod: ModEntry;
  relation: string | null;
  children: TreeNode[];
};

const groups: {
  id: string;
  title: string;
  summary: string;
  rootIds: string[];
}[] = [
  {
    id: "chaos",
    title: "Chaos-familien",
    summary:
      "Discord-modden blev til Jeff Jewetts BepInEx-udgave, og tre projekter er forket derfra. De lægger alle BoomerangFoo.dll ind, så de erstatter hinanden. Kortet for Chaos Mod viser udgivelse 0.5.4. Slaughter House er forket fra 0.4.1, før de senere tilføjelser.",
    rootIds: ["original"],
  },
  {
    id: "online",
    title: "Online",
    summary:
      "Samme forfatter lagde først et proof of concept op og byggede derefter den anden prototype oven på det.",
    rootIds: ["online-1"],
  },
  {
    id: "solo",
    title: "Egen kodebase",
    summary:
      "8 Player Mod og Hat Loader har hver deres repo og deler ikke kode med Chaos-familien eller med hinanden.",
    rootIds: ["eight", "hats"],
  },
];

function branch(id: string): TreeNode {
  const mod = mods.find((item) => item.id === id);
  if (!mod) {
    throw new Error(`Ukendt mod i stamtræet: ${id}`);
  }
  const entry = lineage.find((item) => item.id === id);
  const children = lineage
    .filter((item) => item.basedOn === id)
    .map((item) => branch(item.id));
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
                nodes={[branch(rootId)]}
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
          Dæmpede kort matcher ikke filtret. De bliver stående, så man stadig kan se, hvad de er bygget på.
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
                    {statusLabel(node.mod.status)}
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
                  Sidst opdateret {node.mod.updatedLabel}
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
