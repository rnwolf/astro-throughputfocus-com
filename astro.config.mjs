import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";
import webmanifest from "astro-webmanifest";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://throughputfocus.com",
  markdown: {
    remarkPlugins: ["remark-gfm"],
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
      theme: "dracula",
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
    webmanifest({
      icon: "src/icons/2022-01-22 throughputfocus_logo-square black.svg", // source for favicon & icons
      name: "Throughput Focus Website", // required
      short_name: "Focus Website",
      description: "How to organise your teams for happiness and wealth.",
      start_url: "/",
      theme_color: "#f3f20c",
      background_color: "#f3f20c",
      display: "standalone",
    }),
    astroImageTools,
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    // Only run `compress` integration when in production environments, etc...
    import.meta.env.production ? compress() : null,
  ],
});
