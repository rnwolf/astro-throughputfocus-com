//-- /src/pages/exportSearchIndexWithContent.json.js
// Source https://www.readonlychild.com/blog/astro-md-content/
// This feed has the actual page content it.

export async function get() {
  let fetchedPosts = await import.meta.globEager(`../pages/posts/*.md`);
  let ary = [];
  for (let postkey in fetchedPosts) {
    if (
      fetchedPosts[postkey].frontmatter.pubDate &&
      fetchedPosts[postkey].frontmatter.title
    ) {
      let post = fetchedPosts[postkey];
      let awaitedPost = await post.default();
      ary.push({
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        tags: post.frontmatter.tags.join(" "),
        pubDate: post.frontmatter.pubDate,
        slug: post.url,
        image: post.frontmatter.openGraph.basic.image,
        content: awaitedPost.metadata.source,
      });
    }
  }
  //   let body = { entries: ary };

  // Filter out draft posts & sort with the latest pubDate at the top.
  let posts = ary
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
    );

  return {
    body: JSON.stringify(posts, false, 2),
  };
}
