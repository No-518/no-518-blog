import rss from '@astrojs/rss';
import { getPostGroups } from '../utils/content';
import { site } from '../config/site';
import { withBase } from '../utils/url';

export async function GET(context) {
  const posts = await getPostGroups();
  const siteUrl = new URL(import.meta.env.BASE_URL, context.site);
  const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[char]);
  return rss({
    title: site.name,
    description: site.description,
    site: siteUrl,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/blog/${post.slug}`),
      customData: post.translations.length > 1 ? post.translations.map((translation) => {
        const href = new URL(withBase(`/blog/${translation.slug}`), context.site).href;
        return `<atom:link rel="alternate" type="text/html" hreflang="${translation.data.lang}" href="${escapeXml(href)}" title="${escapeXml(translation.data.title)}" />`;
      }).join('') : '',
    })),
  });
}
