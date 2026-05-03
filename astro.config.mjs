import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://toolswiki.deebox.dev",
  integrations: [
    starlight({
      title: "Tools Wiki",
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        { slug: "git" },
        { slug: "ssh" },
        { slug: "tmux" },
        {
          label: "neovim",
          collapsed: false,
          items: [{ slug: "neovim/grug-far" }],
        },
      ],
    }),
  ],
});

