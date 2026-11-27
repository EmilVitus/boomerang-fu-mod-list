import assert from "node:assert/strict";
import test from "node:test";

import { recordedBuilds, namedPatches } from "../data/steam-timeline.ts";
import { buildTimeline, parseSteamVersions, versionAt } from "./game-clock.ts";

const timeline = buildTimeline({
  named: namedPatches,
  recorded: recordedBuilds,
  news: parseSteamVersions("Update 1.4.0 Patch Notes", "2026-11-06T01:16:55Z"),
  liveBuild: { buildId: "26934991", at: "2026-11-26T00:27:07Z" },
});

test("a push after the silent build is on 1.4.2", () => {
  const point = versionAt(timeline, "2026-11-26T21:31:19Z");
  assert.equal(point.version, "1.4.2");
  assert.equal(point.unnamedAfter, null);
  assert.equal(point.silent, true);
});

test("a push on 25 November stays on 1.4.1", () => {
  const point = versionAt(timeline, "2026-11-25T08:10:18Z");
  assert.equal(point.version, "1.4.1");
  assert.equal(point.silent, false);
});

test("older mods keep the seeded version", () => {
  assert.equal(versionAt(timeline, "2022-12-23T12:00:00Z").version, "1.2.1");
  assert.equal(versionAt(timeline, "2025-03-02T12:00:00Z").version, "1.3.4");
  assert.equal(versionAt(timeline, "2025-03-30T12:00:00Z").version, "1.3.5");
  assert.equal(versionAt(timeline, "2026-10-16T12:00:00Z").version, "1.3.7");
  assert.equal(versionAt(timeline, "2026-11-07T12:00:00Z").version, "1.4.0");
});

test("news does not move 1.4.0 later than the seeded build date", () => {
  assert.equal(versionAt(timeline, "2026-11-04T12:00:00Z").version, "1.4.0");
});

test("a newer public build without a name sorts after 1.4.2", () => {
  const next = buildTimeline({
    named: namedPatches,
    recorded: recordedBuilds,
    news: [],
    liveBuild: { buildId: "30000000", at: "2026-12-01T00:00:00Z" },
  });
  const point = versionAt(next, "2026-12-02T00:00:00Z");
  assert.equal(point.unnamedAfter, "1.4.2");
  assert.equal(versionAt(next, "2026-11-26T21:31:19Z").version, "1.4.2");
});
