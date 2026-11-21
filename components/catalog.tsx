"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search, ExternalLink } from "lucide-react";

import { FeatureTable, GameVersionTable } from "@/components/feature-table";
import { LanguageSwitch } from "@/components/language-switch";
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
  lineage,
  mods,
  omitted,
  relatives,
  statuses,
  type CategoryId,
  type StatusId,
} from "@/data/mods";
import { localize } from "@/lib/copy";
import { useLocale, useUi } from "@/lib/locale";

type SortId = "rank" | "newest" | "name";
type ViewId = "liste" | "trae";

function emphasize(text: string, token: string) {
  const [before, after] = text.split(token);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <span className="font-medium">{token}</span>
      {after}
    </>
  );
}

export function Catalog() {
  const { locale } = useLocale();
  const m = useUi();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusId[]>([]);
  const [sort, setSort] = useState<SortId>("rank");
  const [view, setView] = useState<ViewId>("trae");
  const [openId, setOpenId] = useState<string | null>(null);

  const copy = useMemo(
    () =>
      localize(locale, {
        mods,
        categories,
        statuses,
        lineage,
        omitted,
        checked: CHECKED_LABEL,
        bepinex: BEPINEX_RELEASE,
      }),
    [locale],
  );

  const zipCount = copy.mods.filter((mod) =>
    mod.links.some((link) => link.href.toLowerCase().endsWith(".zip")),
  ).length;
  const sourceCount = copy.mods.filter(
    (mod) => mod.status === "kildekode" || mod.status === "discord",
  ).length;
  const onlineCount = copy.mods.filter((mod) => mod.categories.includes("online")).length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = copy.mods.filter((mod) => {
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
        ...mod.categories.map(
          (category) => copy.categories.find((item) => item.id === category)?.label ?? category,
        ),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    return filtered.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, locale);
      if (sort === "newest") return b.released.localeCompare(a.released);
      return a.rank - b.rank;
    });
  }, [copy, locale, query, selectedCategories, selectedStatuses, sort]);

  const openMod = copy.mods.find((mod) => mod.id === openId) ?? null;
  const filtersActive =
    query.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0;

  function toggleCategory(id: CategoryId) {
    setSelectedCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function toggleStatus(id: StatusId) {
    setSelectedStatuses((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function resetFilters() {
    setQuery("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.93_0.06_70),transparent_32rem),radial-gradient(circle_at_bottom_right,oklch(0.9_0.05_140),transparent_28rem)]">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-6 pb-6 sm:px-6 sm:pt-8">
        <LanguageSwitch />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-heading text-sm tracking-[0.18em] text-primary uppercase">
            Steam · Windows · BepInEx
          </p>
          <p className="text-sm text-muted-foreground">{m.checked(copy.checked)}</p>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl leading-tight font-medium tracking-tight sm:text-6xl">
            {m.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{m.intro}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={m.statMods} value={String(copy.mods.length)} />
          <Stat label={m.statZip} value={String(zipCount)} />
          <Stat label={m.statSource} value={String(sourceCount)} />
          <Stat label={m.statOnline} value={String(onlineCount)} />
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
                placeholder={m.searchPlaceholder}
                aria-label={m.searchLabel}
                className="h-10 bg-background pl-9"
              />
            </div>
            <FilterRow label={m.filterType}>
              {copy.categories.map((category) => (
                <FilterChip
                  key={category.id}
                  pressed={selectedCategories.includes(category.id)}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.label}
                </FilterChip>
              ))}
            </FilterRow>
            <FilterRow label={m.filterStatus}>
              {copy.statuses.map((status) => (
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
                <FilterRow label={m.filterView}>
                  <FilterChip pressed={view === "trae"} onClick={() => setView("trae")}>
                    {m.viewTree}
                  </FilterChip>
                  <FilterChip pressed={view === "liste"} onClick={() => setView("liste")}>
                    {m.viewList}
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
                    {m.viewFeatures}
                  </FilterChip>
                  <FilterChip
                    pressed={false}
                    onClick={() =>
                      document.getElementById("ekstra-spillere")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    {m.viewPlayers}
                  </FilterChip>
                  <FilterChip
                    pressed={false}
                    onClick={() =>
                      document.getElementById("spilversion")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    {m.viewVersions}
                  </FilterChip>
                </FilterRow>
                {view === "liste" ? (
                  <FilterRow label={m.filterSort}>
                    <FilterChip pressed={sort === "rank"} onClick={() => setSort("rank")}>
                      {m.sortRank}
                    </FilterChip>
                    <FilterChip pressed={sort === "newest"} onClick={() => setSort("newest")}>
                      {m.sortNewest}
                    </FilterChip>
                    <FilterChip pressed={sort === "name"} onClick={() => setSort("name")}>
                      {m.sortName}
                    </FilterChip>
                  </FilterRow>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {m.count(visible.length, copy.mods.length, view === "trae")}
              </p>
            </div>
          </div>
        </section>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed bg-card/70 px-6 py-14 text-center">
            <p className="font-heading text-2xl">{m.emptyTitle}</p>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">{m.emptyBody}</p>
            <Button className="mt-5" onClick={resetFilters}>
              {m.reset}
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
                    <Badge className={statusTone[mod.status]}>{statusLabel(mod.status, locale)}</Badge>
                    <span className="text-sm text-muted-foreground">{mod.version}</span>
                  </div>
                  <h2 className="font-heading mt-3 text-2xl leading-snug font-medium">{mod.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{mod.authors}</p>
                  <UpdatedLine date={m.checked(mod.updatedLabel)} note={mod.updateNote} />
                  <p className="mt-3 flex-1 leading-relaxed text-foreground/85">{mod.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mod.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {copy.categories.find((item) => item.id === category)?.label ?? category}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button onClick={() => setOpenId(mod.id)}>{m.readDetails}</Button>
                    <Button variant="outline" asChild>
                      <a href={mod.links[0]?.href} target="_blank" rel="noreferrer">
                        {m.sourceLink}
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
              {m.reset}
            </Button>
          </div>
        ) : null}

        <FeatureTable onOpen={setOpenId} />

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-medium">{m.installTitle}</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed">
              <li>
                {m.installFolderBefore}{" "}
                <span className="font-medium">
                  C:\Program Files (x86)\Steam\steamapps\common\Boomerang Fu
                </span>
                {m.installFolderAfter} <span className="font-medium">Boomerang Fu.exe</span>.
              </li>
              <li>
                {m.installBepinexBefore} <span className="font-medium">BepInEx\plugins</span>
                {m.installBepinexMiddle} {m.installBepinexAfter(copy.bepinex)}
              </li>
              <li>{emphasize(m.installOneDll, "BoomerangFoo.dll")}</li>
              <li>{m.installAfterUpdate}</li>
            </ol>
          </div>
          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-medium">{m.omittedTitle}</h2>
            <ul className="mt-4 space-y-4">
              {copy.omitted.map((item) => (
                <li key={item.title}>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <GameVersionTable onOpen={setOpenId} />

        <footer className="mt-10 text-sm leading-relaxed text-muted-foreground">
          <Separator className="mb-4" />
          <p>{m.footer(copy.checked)}</p>
        </footer>
      </main>

      <Dialog open={openMod !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        {openMod ? (
          <ModDialog
            mod={openMod}
            lineageList={copy.lineage}
            modList={copy.mods}
            onOpen={setOpenId}
          />
        ) : null}
      </Dialog>
    </div>
  );
}

function UpdatedLine({ date, note }: { date: string; note?: string }) {
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      {date}
      {note ? <span className="mt-0.5 block text-foreground/70">{note}</span> : null}
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

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
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

function ModDialog({
  mod,
  modList,
  lineageList,
  onOpen,
}: {
  mod: ReturnType<typeof localize<typeof mods>>[number];
  modList: ReturnType<typeof localize<typeof mods>>;
  lineageList: ReturnType<typeof localize<typeof lineage>>;
  onOpen: (id: string) => void;
}) {
  const { locale } = useLocale();
  const m = useUi();
  const family = relatives(mod.id, modList, lineageList);
  const parent = family.parent;
  return (
    <DialogContent showCloseButton className="sm:max-w-2xl max-h-[min(86vh,820px)] overflow-y-auto">
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={statusTone[mod.status]}>{statusLabel(mod.status, locale)}</Badge>
          <span className="text-sm text-muted-foreground">{m.checked(mod.updatedLabel)}</span>
        </div>
        <DialogTitle className="text-2xl">{mod.name}</DialogTitle>
        <DialogDescription>{m.dialogVersion(mod.authors, mod.version)}</DialogDescription>
      </DialogHeader>
      {mod.updateNote ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{mod.updateNote}</p>
      ) : null}
      {parent || family.children.length > 0 ? (
        <Section title={m.dialogLineage}>
          {parent ? (
            <p>
              {family.relation ? `${family.relation}. ` : ""}
              {m.dialogBuiltOn}{" "}
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
            <p>{m.dialogRoot}</p>
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
      <Section title={m.dialogWhat}>
        <ul className="list-disc space-y-2 pl-5">
          {mod.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Section>
      <Section title={m.dialogInstall}>
        <ol className="list-decimal space-y-2 pl-5">
          {mod.install.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>
      <Section title={m.dialogGameVersion}>
        <p>{mod.compatibility}</p>
      </Section>
      <Section title={m.dialogConflicts}>
        <p>{mod.conflicts}</p>
      </Section>
      {mod.downloads ? (
        <p className="text-sm text-muted-foreground">
          {m.dialogDownloads(mod.downloads, localize(locale, CHECKED_LABEL))}
        </p>
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
