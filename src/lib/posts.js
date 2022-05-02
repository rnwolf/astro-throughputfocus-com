import { getReadingTime } from "./readingtime.js";

async function load() {
  const fetchedPosts = import.meta.globEager("../pages/post/*.md");
  const mappedPosts = Object.keys(fetchedPosts).map((key) => {
    const post = fetchedPosts[key];
    const url = key.replace("../pages/", "/").replace(".md", "/");
    const item = { ...post.frontmatter, url };
    // item.readingTime = getReadingTime(post.metadata.html);
    return item;
  });

  return mappedPosts;
}

let _posts;

export async function getAllPosts() {
  _posts = _posts || load();

  return await _posts;
}
