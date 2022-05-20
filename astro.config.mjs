import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import { astroImageTools } from "astro-imagetools";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://throughputfocus.com",
  markdown: {
    rehypePlugins: [
      // "rehype-slug", // This plugin will make the headings a-href links in their own right.
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
        },
      ],
    ],
    shikiConfig: {
      theme: "solarized-light",
      wrap: true,
    },
  },
  vite: {
    plugins: [],
    ssr: {
      external: ["svgo"],
    },
  },
  integrations: [
    // astroImageTools,
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
  ],
});
