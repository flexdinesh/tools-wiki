import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { test } from "node:test";
import { MD_PATHS } from "../src/md-paths.ts";

const docsDirectory = "src/content/docs";

async function publishedPaths(directory: string): Promise<string[]> {
  const paths: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      paths.push(...await publishedPaths(path));
    } else if (/\.mdx?$/.test(entry.name) && entry.name !== "index.mdx") {
      const source = await readFile(path, "utf8");
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
      assert.ok(frontmatter, `${path} needs frontmatter`);
      assert.match(frontmatter, /^title:\s*\S/m, `${path} needs title`);
      assert.match(frontmatter, /^description:\s*\S/m, `${path} needs description`);
      if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;
      paths.push("/" + relative(docsDirectory, path).split(sep).join("/").replace(/\.mdx?$/, ""));
    }
  }
  return paths;
}

test("home directory links cover published tools without duplicates or broken targets", async () => {
  const home = await readFile(join(docsDirectory, "index.mdx"), "utf8");
  const links = [...home.matchAll(/<LinkCard\b[^>]*\/>/g)].map(match => {
    const href = match[0].match(/\bhref="([^"]+)"/)?.[1];
    assert.ok(href, "Each directory card needs a URL");
    return href.replace(/\/$/, "");
  });
  assert.equal(new Set(links).size, links.length, "Duplicate directory links");
  assert.deepEqual(links.sort(), (await publishedPaths(docsDirectory)).sort());
  for (const path of links) await access(join("dist", path.slice(1), "index.html"));
});

test("worker manifest matches published Markdown artifacts", async () => {
  const paths = await publishedPaths(docsDirectory);
  assert.deepEqual([...MD_PATHS].sort(), paths.sort());
  for (const path of paths) await access(join("dist", path.slice(1) + ".md"));
});
