import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://toolswiki.deebox.dev",
  integrations: [
    starlight({
      title: "Tools Wiki",
      components: {
        Head: "./src/components/Head.astro",
      },
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/flexdinesh/tools-wiki",
        },
      ],
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
