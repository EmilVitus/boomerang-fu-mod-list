"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search, ExternalLink } from "lucide-react";

import { FeatureTable } from "@/components/feature-table";
import { LineageTree } from "@/components/lineage-tree";
import { statusLabel, statusTone } from "@/components/status-tone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BEPINEX_RELEASE,
  CHECKED_LABEL,
  categories,
  mods,
  omitted,
  relatives,
  statuses,
  type CategoryId,
  type ModEntry,
  type StatusId,
} from "@/data/mods";

type SortId = "rank" | "newest" | "name";
type ViewId = "liste" | "trae";

function categoryLabel(id: CategoryId) {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function Catalog() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusId[]>([]);
  const [sort, setSort] = useState<SortId>("rank");
  const [view, setView] = useState<ViewId>("trae");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = mods.filter((mod) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.every((category) => mod.categories.includes(category))
      ) {
        return false;
      }
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(mod.status)) {
        return false;
      }
      if (!needle) return true;
      const haystack = [
        mod.name,
        mod.authors,
        mod.summary,
        mod.version,
        mod.updatedLabel,
        ...mod.features,
        ...mod.categories.map(categoryLabel),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    return filtered.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "da");
      if (sort === "newest") return b.released.localeCompare(a.released);
      return a.rank - b.rank;
    });
  }, [query, selectedCategories, selectedStatuses, sort]);

  const openMod = mods.find((mod) => mod.id === openId) ?? null;
  const filtersActive =
    query.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0;

  function toggleCategory(id: CategoryId) {
    setSelectedCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function toggleStatus(id: StatusId) {
    setSelectedStatuses((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function resetFilters() {
    setQuery("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.93_0.06_70),transparent_32rem),radial-gradient(circle_at_bottom_right,oklch(0.9_0.05_140),transparent_28rem)]">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-10 pb-6 sm:px-6 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-heading text-sm tracking-[0.18em] text-primary uppercase">
            Steam · Windows · BepInEx
          </p>
          <p className="text-sm text-muted-foreground">Sidst opdateret {CHECKED_LABEL}</p>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight font-medium tracking-tight sm:text-6xl">
            Alle offentlige Boomerang Fu-mods til Windows
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Ni mods og forks, som kan hentes eller læses uden at være med i en lukket
            gruppe. Stamtræet viser, hvilken der er bygget oven på hvilken. Spillet
            fik version 1.4.0 den 3. november 2026. Ingen af dem er bekræftet på den
            build.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Mods i listen" value={String(mods.length)} />
          <Stat label="Med en zip" value="5" />
          <Stat label="Kun kilde eller Discord" value="2" />
          <Stat label="Online-prototyper" value="2" />
        </dl>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <section className="rounded-2xl border bg-card/90 p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Søg efter navn, forfatter eller powerup"
                aria-label="Søg i mods"
                className="h-10 bg-background pl-9"
              />
            </div>
            <FilterRow label="Type">
              {categories.map((category) => (
                <FilterChip
                  key={category.id}
                  pressed={selectedCategories.includes(category.id)}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.label}
                </FilterChip>
              ))}
            </FilterRow>
            <FilterRow label="Status">
              {statuses.map((status) => (
                <FilterChip
                  key={status.id}
                  pressed={selectedStatuses.includes(status.id)}
                  onClick={() => toggleStatus(status.id)}
                >
                  {status.label}
                </FilterChip>
              ))}
            </FilterRow>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-3">
                <FilterRow label="Visning">
                  <FilterChip pressed={view === "trae"} onClick={() => setView("trae")}>
                    Stamtræ
                  </FilterChip>
                  <FilterChip pressed={view === "liste"} onClick={() => setView("liste")}>
                    Liste
                  </FilterChip>
                  <FilterChip
                    pressed={false}
                    onClick={() =>
                      document.getElementById("chaos-funktioner")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    Funktionstabel
                  </FilterChip>
                </FilterRow>
                {view === "liste" ? (
                  <FilterRow label="Sortering">
                    <FilterChip pressed={sort === "rank"} onClick={() => setSort("rank")}>
                      Mest brugbar
                    </FilterChip>
                    <FilterChip pressed={sort === "newest"} onClick={() => setSort("newest")}>
                      Nyeste
                    </FilterChip>
                    <FilterChip pressed={sort === "name"} onClick={() => setSort("name")}>
                      Navn
                    </FilterChip>
                  </FilterRow>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {visible.length} af {mods.length} {view === "trae" ? "i træet" : "vist"}
              </p>
            </div>
          </div>
        </section>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed bg-card/70 px-6 py-14 text-center">
            <p className="font-heading text-2xl">Ingen mods matcher</p>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Søgningen og filtrene rammer ingen af de ni poster. Ryd dem, og hele
              listen kommer tilbage.
            </p>
            <Button className="mt-5" onClick={resetFilters}>
              Nulstil filtre
            </Button>
          </div>
        ) : view === "trae" ? (
          <LineageTree
            matchIds={new Set(visible.map((mod) => mod.id))}
            filtersActive={filtersActive}
            onOpen={setOpenId}
          />
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {visible.map((mod) => (
              <li key={mod.id}>
                <article className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={statusTone[mod.status]}>{statusLabel(mod.status)}</Badge>
                    <span className="text-sm text-muted-foreground">{mod.version}</span>
                  </div>
                  <h2 className="font-heading mt-3 text-2xl leading-snug font-medium">
                    {mod.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{mod.authors}</p>
                  <UpdatedLine mod={mod} />
                  <p className="mt-3 flex-1 leading-relaxed text-foreground/85">{mod.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mod.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {categoryLabel(category)}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button onClick={() => setOpenId(mod.id)}>Læs detaljer</Button>
                    <Button variant="outline" asChild>
                      <a href={mod.links[0]?.href} target="_blank" rel="noreferrer">
                        Kilde
                        <ExternalLink data-icon="inline-end" />
                      </a>
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {filtersActive && visible.length > 0 ? (
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={resetFilters}>
              Nulstil filtre
            </Button>
          </div>
        ) : null}

        <FeatureTable onOpen={setOpenId} />

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-medium">Sådan lægges en mod i</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed">
              <li>
                Ejer du spillet på Steam, ligger det som regel i{" "}
                <span className="font-medium">
                  C:\Program Files (x86)\Steam\steamapps\common\Boomerang Fu
                </span>
                , ved siden af <span className="font-medium">Boomerang Fu.exe</span>.
              </li>
              <li>
                Chaos Mod og stack-forken har BepInEx med i zippen. 8 Player Mod og
                online-prototyperne kræver, at du installerer BepInEx 5 x64 selv og
                starter spillet én gang, før plugin-filen lægges i{" "}
                <span className="font-medium">BepInEx\plugins</span>. Seneste stabile
                udgave i 5.x-linjen er BepInEx {BEPINEX_RELEASE}.
              </li>
              <li>
                Kun én <span className="font-medium">BoomerangFoo.dll</span> kan være
                aktiv. Chaos Mod, stack-forken, Remix og Slaughter House erstatter
                hinanden. 8 Player Mod kan heller ikke køre sammen med dem.
              </li>
              <li>
                Efter 1.4.0 skal du regne med, at menuen kan crashe eller at modden
                slet ikke loader. Fjern dll’en for at komme tilbage til det rene spil.
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-medium">Ikke med i listen</h2>
            <ul className="mt-4 space-y-4">
              {omitted.map((item) => (
                <li key={item.title}>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="mt-10 text-sm leading-relaxed text-muted-foreground">
          <Separator className="mb-4" />
          <p>
            Kilder: GitHub-repos og releases for Jeffjewett27/BoomerangFoo,
            huseinnabil1997/BoomerangFoo-ChaosMod, Shyngyskhan-333/boomerang-fu-8-player-mod,
            alialyami90/BoomerangFooRemix, william-spongberg/BoomerangFooMod og
            exp111/BoomerangFuStuff, plus opslag i r/BoomerangFu. Download-tal er
            GitHubs tæller på den nævnte fil, læst {CHECKED_LABEL}. Modsene er
            uofficielle og har ingen tilknytning til Cranky Watermelon.
          </p>
        </footer>
      </main>

      <Dialog open={openMod !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        {openMod ? <ModDialog mod={openMod} onOpen={setOpenId} /> : null}
      </Dialog>
    </div>
  );
}

function UpdatedLine({ mod }: { mod: ModEntry }) {
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      Sidst opdateret {mod.updatedLabel}
      {mod.updateNote ? (
        <span className="mt-0.5 block text-foreground/70">{mod.updateNote}</span>
      ) : null}
    </p>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card/80 px-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-heading text-3xl font-medium">{value}</dd>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <p className="w-24 shrink-0 pt-1.5 text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={pressed ? "default" : "outline"}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function ModDialog({ mod, onOpen }: { mod: ModEntry; onOpen: (id: string) => void }) {
  const family = relatives(mod.id);
  const parent = family.parent;
  return (
    <DialogContent
      showCloseButton
      className="sm:max-w-2xl max-h-[min(86vh,820px)] overflow-y-auto"
    >
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={statusTone[mod.status]}>{statusLabel(mod.status)}</Badge>
          <span className="text-sm text-muted-foreground">
            Sidst opdateret {mod.updatedLabel}
          </span>
        </div>
        <DialogTitle className="text-2xl">{mod.name}</DialogTitle>
        <DialogDescription>
          {mod.authors}. Version {mod.version}.
        </DialogDescription>
      </DialogHeader>
      {mod.updateNote ? <p className="text-sm leading-relaxed text-muted-foreground">{mod.updateNote}</p> : null}
      {parent || family.children.length > 0 ? (
        <Section title="Stamtræ">
          {parent ? (
            <p>
              {family.relation ? `${family.relation}. ` : ""}
              Bygget oven på{" "}
              <button
                type="button"
                className="font-medium text-primary underline-offset-4 hover:underline"
                onClick={() => onOpen(parent.id)}
              >
                {parent.name}
              </button>
              .
            </p>
          ) : (
            <p>Udgangspunktet i sin gren.</p>
          )}
          {family.children.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {family.children.map((child) => (
                <li key={child.mod.id}>
                  {child.relation ? `${child.relation}: ` : ""}
                  <button
                    type="button"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    onClick={() => onOpen(child.mod.id)}
                  >
                    {child.mod.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}
      <Section title="Hvad den gør">
        <ul className="list-disc space-y-2 pl-5">
          {mod.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Section>
      <Section title="Installation på Windows">
        <ol className="list-decimal space-y-2 pl-5">
          {mod.install.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
      <Section title="Spilversion">
        <p>{mod.compatibility}</p>
      </Section>
      <Section title="Kan den køre sammen med andre?">
        <p>{mod.conflicts}</p>
      </Section>
      {mod.downloads ? (
        <p className="text-sm text-muted-foreground">{mod.downloads}, læst {CHECKED_LABEL}.</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {mod.links.map((link) => (
          <Button key={link.href} variant="outline" asChild>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ExternalLink data-icon="inline-end" />
            </a>
          </Button>
        ))}
      </div>
    </DialogContent>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-heading text-lg font-medium">{title}</h3>
      <div className="mt-2 leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
