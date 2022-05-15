// src/pages/rss.xml.js
import rss from "@astrojs/rss";

/// Example code to get posts for RSS feed ////
// const postImportResult = import.meta.globEager("../pages/posts/*.md");
// const posts = Object.values(postImportResult);

// //////  My code eto get Posts //////
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
  .sort(
    (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
  );

export const get = () =>
  rss({
    title: "Buzz’s Blog",
    description: "A humble Astronaut’s guide to the stars",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      //// For my posts structure ////
      link: post.url,
      title: post.title,
      pubDate: post.pubDate,
      /// From Example... almost modified for url which is normally not in frontmatter ////
      // link: post.frontmatter.slug,
      // title: post.frontmatter.title,
      // pubDate: post.frontmatter.pubDate,
    })),
  });
