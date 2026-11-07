import { readdirSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";

import { remarkEntryCounts } from "./src/lib/remark-entry-counts.ts";

const pageCount = directory => String(readdirSync(`src/content/docs/${directory}`).length);

export default defineConfig({
  site: "https://toolswiki.hoplabs.dev",

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
      display: "optional",
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese", "symbols2"],
      display: "optional",
      fallbacks: ["monospace"],
    },
  ],

  markdown: {
    processor: unified({ remarkPlugins: [remarkEntryCounts] }),
  },

  integrations: [
    starlight({
      title: "tools wiki",
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      components: {
        Head: "./src/components/Head.astro",
        Hero: "./src/components/Hero.astro",
        PageTitle: "./src/components/PageTitle.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        SkipLink: "./src/components/SkipLink.astro",
      },
      customCss: ["./src/styles/global.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/flexdinesh/tools-wiki",
        },
      ],
      sidebar: [
        {
          label: "Cheatsheets",
          badge: pageCount("cheatsheets"),
          collapsed: true,
          items: [{ autogenerate: { directory: "cheatsheets" } }],
        },
        {
          label: "Neovim Plugins",
          badge: pageCount("neovim"),
          collapsed: true,
          items: [{ autogenerate: { directory: "neovim" } }],
        },
      ],
    }),
  ],
});
