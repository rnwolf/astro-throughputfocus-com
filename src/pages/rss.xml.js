// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import Config from "$/website.config.cjs";

let fetchedPosts = await import.meta.globEager(`../pages/posts/*.md`);
const mappedPosts = Object.keys(fetchedPosts).map((key) => {
  const post = fetchedPosts[key];
  const url = key.replace("../pages/", "/").replace(".md", "/");
  const item = { ...post.frontmatter, url };
  return item;
});

// Filter out draft posts & get most recently published.
let posts = mappedPosts
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf())
  .slice(0, 3); // Limit feed to the latest posts

export const get = () =>
  rss({
    title: Config.siteTitle,
    description: Config.siteDescription,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      //// For my posts structure ////
      link: post.url,
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      customData: `<language>en-us</language>`,
    })),
  });
