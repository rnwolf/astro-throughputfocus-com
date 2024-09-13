import rss from '@astrojs/rss';
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";


export async function GET(context) {
  const posts = await getSinglePage("posts");
  const sortedPosts = sortByDate(posts);
  const currentPosts = sortedPosts.slice(0, config.settings.pagination);
  return rss({
    title: 'Rudiger Wolf’s Blog',
    description: 'A guide to my past and future self.',
    site: context.site,
    items: currentPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      // Compute RSS link from post `slug`
      link: `${post.slug}/`,
    })),
  });
}