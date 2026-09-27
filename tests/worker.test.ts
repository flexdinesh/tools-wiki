import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "../src/worker.ts";

interface RequestOptions {
  accept?: string;
  userAgent?: string;
  path?: string;
  method?: string;
  vary?: string;
  markdownStatus?: number;
}

async function requestPage(options: RequestOptions = {}) {
  const headers = new Headers();
  if (options.accept !== undefined) headers.set("Accept", options.accept);
  if (options.userAgent !== undefined) headers.set("User-Agent", options.userAgent);
  const assetPaths: string[] = [];
  const request = new Request(`https://example.test${options.path ?? "/cheatsheets/git/"}`, {
    method: options.method ?? "GET",
    headers,
  });
  const response = await worker.fetch(request, {
    ASSETS: {
      async fetch(assetRequest: Request) {
        const path = new URL(assetRequest.url).pathname;
        assetPaths.push(path);
        const markdown = path.endsWith(".md");
        const assetHeaders = new Headers({ "Content-Type": markdown ? "text/markdown" : "text/html" });
        if (options.vary !== undefined) assetHeaders.set("Vary", options.vary);
        return new Response(assetRequest.method === "HEAD" ? null : markdown ? "# git" : "HTML", {
          status: markdown ? options.markdownStatus ?? 200 : 200,
          headers: assetHeaders,
        });
      },
    },
  });
  return { response, assetPaths };
}

const negotiationCases = [
  { name: "ordinary browser", accept: "text/html", userAgent: "Mozilla/5.0", markdown: false },
  { name: "explicit Markdown", accept: "text/markdown", userAgent: "Mozilla/5.0", markdown: true },
  { name: "Markdown forbidden", accept: "text/html, text/markdown;q=0", userAgent: "curl/8", markdown: false },
  { name: "HTML preferred", accept: "text/html;q=1, text/markdown;q=0.1", userAgent: "curl/8", markdown: false },
  { name: "Markdown preferred", accept: "text/html;q=0.1, text/markdown;q=0.9", userAgent: "Mozilla/5.0", markdown: true },
  { name: "agent explicitly requests HTML", accept: "text/html", userAgent: "curl/8", markdown: false },
  { name: "agent with wildcard", accept: "*/*", userAgent: "curl/8", markdown: true },
  { name: "browser with wildcard", accept: "*/*", userAgent: "Mozilla/5.0", markdown: false },
  { name: "agent with text wildcard", accept: "text/*", userAgent: "curl/8", markdown: true },
  { name: "specific rejection overrides wildcard", accept: "*/*, text/markdown;q=0", userAgent: "curl/8", markdown: false },
  { name: "specific lower quality overrides wildcard", accept: "text/*;q=1, text/markdown;q=0.2", userAgent: "curl/8", markdown: false },
  { name: "specific Markdown overrides text wildcard", accept: "text/*;q=0.2, text/markdown;q=0.9", userAgent: "Mozilla/5.0", markdown: true },
  { name: "case and whitespace", accept: "TEXT/HTML; q=0.1, TEXT/MARKDOWN; Q=0.9", userAgent: "Mozilla/5.0", markdown: true },
  { name: "invalid quality", accept: "text/html, text/markdown;q=invalid", userAgent: "curl/8", markdown: false },
  { name: "out-of-range quality", accept: "text/html, text/markdown;q=2", userAgent: "curl/8", markdown: false },
  { name: "no acceptable representation", accept: "*/*;q=0", userAgent: "curl/8", markdown: false },
];

for (const scenario of negotiationCases) {
  test(scenario.name, async () => {
    const { response } = await requestPage(scenario);
    assert.equal(await response.text(), scenario.markdown ? "# git" : "HTML");
    assert.equal(response.headers.get("Vary"), "Accept, User-Agent");
  });
}

test("agent detection without Accept", async () => {
  const { response } = await requestPage({ userAgent: "ClaudeBot" });
  assert.equal(await response.text(), "# git");
});

test("missing preferences default to HTML", async () => {
  const { response } = await requestPage();
  assert.equal(await response.text(), "HTML");
});

for (const accept of ["text/html", "text/markdown"]) {
  test(`${accept} preserves existing Vary fields`, async () => {
    const { response } = await requestPage({ accept, vary: "Accept-Encoding, accept" });
    assert.equal(response.headers.get("Vary"), "Accept-Encoding, accept, User-Agent");
  });
  test(`${accept} preserves wildcard Vary`, async () => {
    const { response } = await requestPage({ accept, vary: "*" });
    assert.equal(response.headers.get("Vary"), "*");
  });
}

test("Markdown has its content type and cache policy", async () => {
  const { response } = await requestPage({ accept: "text/markdown" });
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=3600, stale-while-revalidate=86400");
});

test("unavailable Markdown falls back to original HTML request", async () => {
  const { response, assetPaths } = await requestPage({ accept: "text/markdown", markdownStatus: 404 });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "HTML");
  assert.deepEqual(assetPaths, ["/cheatsheets/git.md", "/cheatsheets/git/"]);
  assert.equal(response.headers.get("Vary"), "Accept, User-Agent");
});

test("unknown paths are not rewritten", async () => {
  const { assetPaths } = await requestPage({ accept: "text/markdown", path: "/unknown/" });
  assert.deepEqual(assetPaths, ["/unknown/"]);
});

test("trailing slash is optional", async () => {
  const { response, assetPaths } = await requestPage({ accept: "text/markdown", path: "/cheatsheets/git" });
  assert.equal(await response.text(), "# git");
  assert.deepEqual(assetPaths, ["/cheatsheets/git.md"]);
});

test("HEAD preserves an empty body", async () => {
  const { response, assetPaths } = await requestPage({ accept: "text/markdown", method: "HEAD" });
  assert.equal(await response.text(), "");
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.deepEqual(assetPaths, ["/cheatsheets/git.md"]);
});
