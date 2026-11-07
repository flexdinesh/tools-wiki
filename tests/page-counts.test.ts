import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { countPage, entryLabel } from "../src/lib/page-counts.ts";

const page = (tool: string) => readFile(`src/content/docs/cheatsheets/${tool}.md`, "utf8");

test("counts entry headings and ignores headings inside fenced output", async () => {
  const counts = countPage(await page("git"));
  assert.equal(counts.sections.length, 18);
  assert.equal(counts.entries, 72);
  assert.deepEqual(counts.sections[0], { title: "git config", entries: 6 });
  assert.equal(counts.sections.some(section => section.title.startsWith("feature/")), false);
});

test("counts table rows as entries without table headers or separators", () => {
  const counts = countPage([
    "## Keys",
    "| Key | Purpose |",
    "| --- | --- |",
    "| `a` | One. |",
    "| `b` | Two. |",
    "### Also",
  ].join("\n"));
  assert.deepEqual(counts.sections, [{ title: "Keys", entries: 3 }]);
});

test("counts table-only pages", async () => {
  assert.equal(countPage(await page("vscode")).entries, 53);
});

test("falls back to code blocks for sections without entries", async () => {
  assert.equal(countPage(await page("flatpak")).entries, 7);
  assert.deepEqual(countPage("## Run\n```bash\nls\n```\n```bash\npwd\n```").sections, [
    { title: "Run", entries: 2 },
  ]);
});

test("longer fences contain shorter fences", () => {
  const counts = countPage("## Docs\n````markdown\n```bash\n## Not a section\n```\n````");
  assert.deepEqual(counts.sections, [{ title: "Docs", entries: 1 }]);
});

test("labels are singular and plural", () => {
  assert.equal(entryLabel(1), "1 entry");
  assert.equal(entryLabel(6), "6 entries");
});
