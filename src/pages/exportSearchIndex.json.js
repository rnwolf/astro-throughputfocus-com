// src/pages/exportSearchIndex.json.js
// Run via http://localhost:3000/exportSearchIndex.json

export async function get() {
  let fetchedPosts = await import.meta.globEager(`../pages/posts/*.md`);

  const mappedPosts = Object.keys(fetchedPosts).map((key) => {
    const post = fetchedPosts[key];
    const url = key.replace("../pages/", "/").replace(".md", "/");
    const item = { ...post.frontmatter, url };
    return item;
  });

  // Filter out draft posts & sort with the latest pubDate at the top.
  let posts = mappedPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
    );

  return {
    body: JSON.stringify(posts, false, 2),
  };
}
