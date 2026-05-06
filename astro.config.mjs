import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://toolswiki.deebox.dev",

  integrations: [
    starlight({
      title: "tools wiki",
      components: {
        Head: "./src/components/Head.astro",
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
          label: "cheatsheets",
          collapsed: false,
          autogenerate: { directory: "cheatsheets" },
        },
        {
          label: "neovim plugins",
          collapsed: false,
          autogenerate: { directory: "neovim" },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});

