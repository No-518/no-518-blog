import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/content';
import { site } from '../config/site';
import { withBase } from '../utils/url';

export async function GET(context) {
  const posts = await getPublishedPosts();
  const siteUrl = new URL(import.meta.env.BASE_URL, context.site);
  return rss({
    title: site.name,
    description: site.description,
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/blog/${post.slug}`),
    })),
  });
}
