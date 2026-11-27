import type { DatedVersion, RecordedBuild } from "@/lib/game-clock";

/** Steam builds whose start time is not the same as the community post. */
export const namedPatches: DatedVersion[] = [
  { version: "1.2.1", at: "2022-04-29T05:40:13Z" },
  { version: "1.3.2", at: "2024-06-11T11:03:34Z" },
  { version: "1.3.4", at: "2024-07-22T07:00:56Z" },
  { version: "1.3.5", at: "2025-03-29T05:18:46Z" },
  { version: "1.3.6", at: "2025-04-13T04:29:27Z" },
  { version: "1.3.7", at: "2025-10-17T06:26:24Z" },
  { version: "1.4.0", at: "2026-11-03T00:00:00Z" },
  { version: "1.4.1", at: "2026-11-19T02:09:05Z" },
];

/**
 * Public branch updates that shipped without a Steam news title.
 * 26934991 is the branch that replaced 1.4.1 on 26 November 2026.
 * The game itself shows that build as 1.4.2. A later unnamed build is
 * kept only while it is still the public branch, unless its id is added here.
 */
export const recordedBuilds: RecordedBuild[] = [
  { buildId: "26934991", at: "2026-11-26T00:27:07Z", version: "1.4.2" },
];
