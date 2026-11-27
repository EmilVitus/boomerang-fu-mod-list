export type DatedVersion = {
  version: string;
  at: string;
};

export type RecordedBuild = {
  buildId: string;
  at: string;
  version: string | null;
};

export type TimelinePoint = {
  at: string;
  atMs: number;
  version: string;
  unnamedAfter: string | null;
  buildId?: string;
  silent: boolean;
};

const SAME_RELEASE_MS = 2 * 60 * 60 * 1000;

export function gameVersionRank(version: string) {
  return version.split(".").reduce((total, part) => total * 100 + Number(part), 0);
}

export function pointRank(point: { version: string; unnamedAfter: string | null }) {
  const base = gameVersionRank(point.unnamedAfter ?? point.version);
  return base + (point.unnamedAfter ? 0.5 : 0);
}

function earlier(versions: Map<string, { atMs: number; silent: boolean }>, version: string, atMs: number, silent: boolean) {
  const previous = versions.get(version);
  if (!previous || atMs < previous.atMs) {
    versions.set(version, { atMs, silent: previous ? previous.silent && silent : silent });
  } else if (!silent) {
    versions.set(version, { atMs: previous.atMs, silent: false });
  }
}

export function buildTimeline(input: {
  named: DatedVersion[];
  recorded: RecordedBuild[];
  news: DatedVersion[];
  liveBuild: { buildId: string; at: string } | null;
}): TimelinePoint[] {
  const versions = new Map<string, { atMs: number; silent: boolean }>();
  for (const patch of input.named) {
    earlier(versions, patch.version, Date.parse(patch.at), false);
  }
  for (const patch of input.news) {
    earlier(versions, patch.version, Date.parse(patch.at), false);
  }
  for (const build of input.recorded) {
    if (!build.version) continue;
    earlier(versions, build.version, Date.parse(build.at), true);
  }

  const points: TimelinePoint[] = [...versions.entries()].map(([version, value]) => ({
    version,
    at: new Date(value.atMs).toISOString(),
    atMs: value.atMs,
    unnamedAfter: null,
    silent: value.silent,
  }));

  const knownBuildIds = new Set(input.recorded.map((build) => build.buildId));
  const unnamed: TimelinePoint[] = [];

  function addUnnamed(buildId: string, at: string) {
    if (knownBuildIds.has(buildId) && input.recorded.some((build) => build.buildId === buildId && build.version)) {
      return;
    }
    const atMs = Date.parse(at);
    const prior = points
      .filter((point) => point.atMs <= atMs)
      .sort((a, b) => a.atMs - b.atMs)
      .at(-1);
    if (!prior || atMs - prior.atMs < SAME_RELEASE_MS) return;
    unnamed.push({
      version: prior.version,
      at: new Date(atMs).toISOString(),
      atMs,
      unnamedAfter: prior.version,
      buildId,
      silent: true,
    });
  }

  for (const build of input.recorded) {
    if (build.version) continue;
    addUnnamed(build.buildId, build.at);
  }
  if (input.liveBuild && !input.recorded.some((build) => build.buildId === input.liveBuild?.buildId)) {
    addUnnamed(input.liveBuild.buildId, input.liveBuild.at);
  }

  return [...points, ...unnamed].sort((a, b) => a.atMs - b.atMs);
}

export function versionAt(timeline: TimelinePoint[], at: string) {
  const atMs = Date.parse(at);
  let chosen = timeline[0];
  for (const point of timeline) {
    if (point.atMs <= atMs) chosen = point;
    else break;
  }
  return chosen;
}

export function parseSteamVersions(text: string, at: string): DatedVersion[] {
  const found = new Map<string, DatedVersion>();
  for (const match of text.matchAll(/Update\s+(\d+\.\d+(?:\.\d+)?)/gi)) {
    const version = match[1];
    if (!found.has(version)) found.set(version, { version, at });
  }
  return [...found.values()];
}
