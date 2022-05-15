// Run via http://localhost:3000/exportSearchIndex.json

export async function get() {
  let fetchedPosts = await import.meta.globEager(`../pages/posts/*.md`);
  // const filteredPosts = posts.filter((post) => !post.frontmatter.draft);
  //.sort((a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate));

  const mappedPosts = Object.keys(fetchedPosts).map((key) => {
    const post = fetchedPosts[key];
    const url = key.replace("../pages/", "/").replace(".md", "/");
    const item = { ...post.frontmatter, url };
    // const item = { ...post.frontmatter };

    // item.readingTime = getReadingTime(post.metadata.html);
    return item;
  });

  // https://stackoverflow.com/questions/54961169/how-to-filter-and-map-array-of-objects-in-javascript
  // Only keep the specified field(s). In this case draft
  // var result = mappedPosts.reduce((p, { draft }) => {
  //   if (draft) p.push({ draft });
  //   return p;
  // }, []);

  // Filter out draft posts & sort with the latest pubDate at the top.
  let result = mappedPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
    );

  return {
    body: JSON.stringify(result, false, 2),
  };
}
