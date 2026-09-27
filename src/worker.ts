/// <reference types="@cloudflare/workers-types" />

import { MD_PATHS } from "./md-paths.ts";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const AGENT_UA_PATTERN =
  /bot|crawler|claude|gptbot|chatgpt|curl|wget|python-requests|go-http-client|node-fetch|aiohttp|axios|opencode|pi/i;

function acceptedQuality(mediaType: string, accept: string): number {
  let quality = 0;
  let specificity = -1;

  for (const range of accept.toLowerCase().split(",")) {
    const [type, ...parameters] = range.split(";").map(part => part.trim());
    const rank = type === mediaType ? 2 : type === "text/*" ? 1 : type === "*/*" ? 0 : -1;
    if (rank < 0 || rank < specificity) continue;

    const weight = parameters.find(parameter => /^q\s*=/.test(parameter));
    const value = weight === undefined ? 1 : Number(weight.split("=")[1]);
    const candidate = Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0;
    quality = rank === specificity ? Math.max(quality, candidate) : candidate;
    specificity = rank;
  }

  return quality;
}

function prefersMarkdown(request: Request): boolean {
  const accept = request.headers.get("Accept")?.trim();
  if (accept) {
    const markdown = acceptedQuality("text/markdown", accept);
    const html = acceptedQuality("text/html", accept);
    if (markdown !== html) return markdown > html;
    if (markdown === 0) return false;
  }

  // Use agent detection when Accept leaves the representation preference open.
  const ua = request.headers.get("User-Agent") ?? "";
  return AGENT_UA_PATTERN.test(ua);
}

function toMdPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return MD_PATHS.has(normalized) ? normalized + ".md" : null;
}

function addResponseHeaders(response: Response, markdown = false): Response {
  const headers = new Headers(response.headers);
  const vary = (headers.get("Vary") ?? "").split(",").map(field => field.trim()).filter(Boolean);
  if (!vary.includes("*")) {
    for (const field of ["Accept", "User-Agent"]) {
      if (!vary.some(existing => existing.toLowerCase() === field.toLowerCase())) vary.push(field);
    }
    headers.set("Vary", vary.join(", "));
  }
  if (markdown) {
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (prefersMarkdown(request)) {
      const url = new URL(request.url);
      const mdPath = toMdPath(url.pathname);
      if (mdPath) {
        const mdRequest = new Request(
          new URL(mdPath, url.origin).toString(),
          request,
        );
        const response = await env.ASSETS.fetch(mdRequest);
        if (response.ok) return addResponseHeaders(response, true);
      }
    }
    return addResponseHeaders(await env.ASSETS.fetch(request));
  },
};
