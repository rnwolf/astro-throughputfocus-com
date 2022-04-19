import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroImagePlugin from "astro-imagetools/plugin";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://throughputfocus.com/",
  markdown: {
    shikiConfig: {
      theme: "solarized-light",
      wrap: true,
    },
  },
  vite: {
    plugins: [astroImagePlugin],
    ssr: {
      external: ["svgo"],
    },
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
  ],
});
