// Source
// https://github.com/brycewray/astro-site/blob/main/src/pages/index.json.js

// Feed package https://github.com/jpmonette/feed

// generate feed (JSON or RSS)
// https://www.readonlychild.com/blog/astro-md-content/ (2022-04-26)
// h/t Ernesto Lopez
import Config from "$/website.config.cjs";
import { Feed } from "feed";

let feedExt = "xml"; // 'json' or 'xml';
const currentyear = new Date().getFullYear();
const today = new Date();

export async function get() {
  // console.log(import.meta.env.SITE);
  let socialImg = `${Config.siteUrl}${Config.socialImage}`;
  const feed = new Feed({
    title: Config.siteTitle,
    description: Config.siteDescription,
    id: `${Config.siteUrl}`,
    link: `${Config.siteUrl}/rss.${feedExt}`,
    language: "en",
    image: `${Config.siteUrl}/android-chrome-192x192.png`,
    favicon: `${Config.siteUrl}/android-chrome-192x192.png`,
    updated: today, //Should be the most recent article pubDate
    lastBuildDate: today,
    copyright: `Content copyright ${currentyear} except where otherwise noted`,
    feedLinks: {
      json: `${Config.siteUrl}/rss.json`,
      rss: `${Config.siteUrl}/rss.xml`,
    },
    author: {
      name: "Rudiger Wolf",
      email: "rudiger.wolf@Throughputfocus.com",
      link: `${Config.siteUrl}/about/`,
    },
  });

  let allPosts = await import.meta.globEager("./posts/**/*.md");
  let sanitizedDate = "";

  for (let postkey in allPosts) {
    if (
      allPosts[postkey].frontmatter.pubDate &&
      allPosts[postkey].frontmatter.title &&
      !allPosts[postkey].frontmatter.draft
    ) {
      let post = allPosts[postkey];
      let awaitedPost = await post.default();
      let featImg = "";
      sanitizedDate = new Date(post.frontmatter.pubDate);
      let theTitle,
        theContent,
        theDescription = "";
      if (post.frontmatter.openGraph.image.secureUrl) {
        featImg = post.frontmatter.openGraph.image.secureUrl;
      } else {
        featImg = socialImg;
      }
      theTitle = post.frontmatter.title;
      theDescription = post.frontmatter.description;
      theContent = awaitedPost.metadata.source;
      feed.addItem({
        title: theTitle,
        id: `${Config.siteUrl}${post.url}/`,
        link: `${Config.siteUrl}${post.url}/`,
        description: theDescription,
        content: theContent,
        date: sanitizedDate,
        image: featImg,
      });
    }
  }
  feed.items.sort((a, b) => b.date - a.date);
  if (feedExt == "json") {
    return { body: feed.json1() };
  } else {
    return { body: feed.rss2() };
  }
}
