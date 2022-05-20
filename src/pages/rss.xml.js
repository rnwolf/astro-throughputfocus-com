// Source
// https://github.com/brycewray/astro-site/blob/main/src/pages/index.json.js

// generate feed (JSON or RSS)
// https://www.readonlychild.com/blog/astro-md-content/ (2022-04-26)
// h/t Ernesto Lopez
import Config from "$/website.config.cjs";

let feedExt = "xml"; // 'json' or 'xml';
const currentyear = new Date().getFullYear();
import { Feed } from "feed";

// let socialImg =
// "https://res.cloudinary.com/brycewray-com/image/upload/c_fill,w_1024,h_512,q_auto,f_auto,x_0,z_1/";
let socialImg = `${import.meta.env.SITE}${Config.socialImage}`;

// https://cdn.discordapp.com/attachments/830184175176122389/960357703807537183/unknown.png
export async function get() {
  // console.log(import.meta.env.SITE);
  const feed = new Feed({
    title: Config.siteTitle,
    description: Config.siteDescription,
    id: import.meta.env.SITE,
    link: `${import.meta.env.SITE}rss.${feedExt}`,
    language: "en",
    image: `${import.meta.env.SITE}android-chrome-192x192.png`,
    favicon: `${import.meta.env.SITE}"android-chrome-192x192.png`,
    copyright: `Content copyright ${currentyear} except where otherwise noted`,
    feedLinks: {
      json: `${import.meta.env.SITE}rss.json`,
      rss: `${import.meta.env.SITE}rss.xml`,
    },
    author: {
      name: "Rudiger Wolf",
      email: "rudiger.wolf@Throughputfocus.com",
      link: `${import.meta.env.SITE}/about/`,
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
        id: `${import.meta.env.SITE}${post.url}/`,
        link: `${import.meta.env.SITE}${post.url}/`,
        description: theDescription,
        content: theContent,
        author: [
          {
            name: "Rudiger Wolf",
            email: "rudiger.wolf@Throughputfocus.com",
            link: `${import.meta.env.SITE}/about/`,
          },
        ],
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
