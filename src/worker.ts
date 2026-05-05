/// <reference types="@cloudflare/workers-types" />

import { MD_PATHS } from './md-paths';

interface Env {
  ASSETS: { fetch: typeof fetch };
}

const AGENT_UA_PATTERN =
  /bot|crawler|claude|gptbot|chatgpt|curl|wget|python-requests|go-http-client|node-fetch|aiohttp|axios|opencode|pi/i;

function isAgentRequest(request: Request): boolean {
  // B: Accept header explicitly requests markdown
  const accept = request.headers.get('Accept') ?? '';
  if (accept.includes('text/markdown')) return true;

  // A: User-Agent matches known agent patterns
  const ua = request.headers.get('User-Agent') ?? '';
  return AGENT_UA_PATTERN.test(ua);
}

function toMdPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return MD_PATHS.has(normalized) ? normalized + '.md' : null;
}

function addAgentHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  headers.set('X-Worker-Version', '3');
  headers.set('X-Is-Agent', 'yes');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Probe endpoint — proves worker deploys and executes
    if (url.pathname === '/__worker-test') {
      return new Response('worker running v4', {
        headers: {
          'Content-Type': 'text/plain',
          'X-Worker-Version': '4',
          'X-MD-Paths': String(MD_PATHS.size),
        },
      });
    }

    if (isAgentRequest(request)) {
      const mdPath = toMdPath(url.pathname);
      if (mdPath) {
        const mdRequest = new Request(new URL(mdPath, url.origin).toString(), request);
        const response = await env.ASSETS.fetch(mdRequest);
        if (response.ok) return addAgentHeaders(response);
      }
    }
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set('Vary', 'Accept, User-Agent');
    headers.set('X-Worker-Version', '3');
    headers.set('X-Is-Agent', 'no');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};