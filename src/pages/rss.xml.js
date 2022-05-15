// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import Config from "$/website.config.cjs";

/// Example code to get posts for RSS feed ////
// const postImportResult = import.meta.globEager("../pages/posts/*.md");
// const posts = Object.values(postImportResult);

// //////  My code to get Posts //////
let fetchedPosts = await import.meta.globEager(`../pages/posts/*.md`);

const mappedPosts = Object.keys(fetchedPosts).map((key) => {
  const post = fetchedPosts[key];
  const url = key.replace("../pages/", "/").replace(".md", "/");
  const item = { ...post.frontmatter, url };
  return item;
});

// // Filter out draft posts & sort with the latest pubDate at the top.
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
      /// From Example... almost modified for url which is normally not in frontmatter ////
      // link: post.frontmatter.slug,
      // title: post.frontmatter.title,
      // pubDate: post.frontmatter.pubDate,
    })),
  });
