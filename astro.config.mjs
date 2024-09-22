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
        serialize(item) {
          if (/contact_.*[a-z]|test-[a-z]|elements/.test(item.url)) {  // Update this to exclude more pages from site-map
            return undefined;
          }
          // Make sure that any blog posts with todays date n url and the blog index page have a lastmod date
          let dateString = `${new Date().toLocaleString("en-CA", { timeZone: "Europe/London" }).slice(0, 10)}.*|blog`;
          if (new RegExp(dateString, 'i').test(item.url)) {
            item.changefreq = 'daily';
            item.lastmod = new Date();
            item.priority = 0.9;
          }
          return item;
        },
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
