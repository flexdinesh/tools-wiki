interface Plausible {
  (...args: unknown[]): void;
  q?: unknown[][];
  init?: (options?: Record<string, unknown>) => void;
  o?: Record<string, unknown>;
}

interface Window {
  plausible?: Plausible;
}

declare module "virtual:starlight/components/DraftContentNotice" {
  const DraftContentNotice: typeof import("@astrojs/starlight/components/DraftContentNotice.astro").default;
  export default DraftContentNotice;
}
