import { namedPatches, recordedBuilds } from "@/data/steam-timeline";
import { versionRows } from "@/data/game-versions";
import { buildTimeline, parseSteamVersions, versionAt, type DatedVersion, type TimelinePoint } from "@/lib/game-clock";

const REVALIDATE_SECONDS = 21600;
const STEAM_APP = "965680";

export type LiveVersionCell = {
  version: string;
  unnamedAfter: string | null;
  at: string;
  silent: boolean;
};

export type LiveVersions = {
  steam: boolean;
  github: boolean;
  current: LiveVersionCell;
  rows: Record<string, LiveVersionCell>;
};

type SteamBuild = { buildId: string; at: string };

function cell(point: TimelinePoint, at: string): LiveVersionCell {
  return {
    version: point.version,
    unnamedAfter: point.unnamedAfter,
    at,
    silent: point.silent,
  };
}

async function readJson(url: string, headers?: HeadersInit): Promise<unknown | null> {
  try {
    const response = await fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function readSteamNews(): Promise<DatedVersion[]> {
  const body = await readJson(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${STEAM_APP}&count=50&maxlength=800`,
  );
  const items = (body as { appnews?: { newsitems?: { title?: string; contents?: string; date?: number }[] } } | null)
    ?.appnews?.newsitems;
  if (!items) return [];
  return items.flatMap((item) => {
    if (typeof item.date !== "number") return [];
    const at = new Date(item.date * 1000).toISOString();
    return parseSteamVersions(`${item.title ?? ""}\n${item.contents ?? ""}`, at);
  });
}

async function readSteamBuild(): Promise<SteamBuild | null> {
  const body = await readJson(`https://api.steamcmd.net/v1/info/${STEAM_APP}`);
  const branch = (
    body as {
      data?: Record<string, { depots?: { branches?: { public?: { buildid?: string; timeupdated?: string } } } }>;
    } | null
  )?.data?.[STEAM_APP]?.depots?.branches?.public;
  if (!branch?.buildid || !branch.timeupdated) return null;
  const seconds = Number(branch.timeupdated);
  if (!Number.isFinite(seconds)) return null;
  return { buildId: branch.buildid, at: new Date(seconds * 1000).toISOString() };
}

async function readPushedAt(repo: string): Promise<string | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "boomerang-fu-mod-list",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const body = await readJson(`https://api.github.com/repos/${repo}`, headers);
  const pushedAt = (body as { pushed_at?: unknown } | null)?.pushed_at;
  return typeof pushedAt === "string" ? pushedAt : null;
}

export async function loadLiveVersions(): Promise<LiveVersions> {
  const repos = [...new Set(versionRows.flatMap((row) => (row.repo ? [row.repo] : [])))];
  const [news, liveBuild, pushes] = await Promise.all([
    readSteamNews(),
    readSteamBuild(),
    Promise.all(repos.map(async (repo) => [repo, await readPushedAt(repo)] as const)),
  ]);
  const pushedAt = new Map(pushes);
  const timeline = buildTimeline({
    named: namedPatches,
    recorded: recordedBuilds,
    news,
    liveBuild,
  });
  const rows = Object.fromEntries(
    versionRows.map((row) => {
      const at = (row.repo ? pushedAt.get(row.repo) : null) ?? row.updatedAt;
      return [row.id, cell(versionAt(timeline, at), at)];
    }),
  );
  const now = new Date().toISOString();
  return {
    steam: liveBuild !== null,
    github: repos.every((repo) => Boolean(pushedAt.get(repo))),
    current: cell(versionAt(timeline, now), versionAt(timeline, now).at),
    rows,
  };
}
