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
        Hero: "./src/components/Hero.astro",
        PageTitle: "./src/components/PageTitle.astro",
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
          collapsed: true,
          autogenerate: { directory: "cheatsheets" },
        },
        {
          label: "neovim plugins",
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
