import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import expressiveCode from "astro-expressive-code";
import remarkMermaid from "remark-mermaidjs";
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://www.throughputfocus.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  //image: {
  //  service: squooshImageService(),
  //},
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        page !== 'https://www.throughputfocus.com/contact_problem' &&
        page !== 'https://www.throughputfocus.com/test-a' &&
        page !== 'https://www.throughputfocus.com/test-b' &&
        page !== 'https://www.throughputfocus.com/elements' &&
        page !== 'https://www.throughputfocus.com/contact_success',
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    expressiveCode(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMermaid,
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' }
        }
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
