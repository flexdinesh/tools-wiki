import { readdirSync } from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";
import { remarkEntryCounts } from "./src/lib/remark-entry-counts.ts";

const pageCount = directory => String(readdirSync(`src/content/docs/${directory}`).length);

export default defineConfig({
  site: "https://toolswiki.hoplabs.dev",

  markdown: {
    remarkPlugins: [remarkEntryCounts],
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
          autogenerate: { directory: "cheatsheets" },
        },
        {
          label: "Neovim Plugins",
          badge: pageCount("neovim"),
          collapsed: true,
          autogenerate: { directory: "neovim" },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
