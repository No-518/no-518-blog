import { getCollection } from 'astro:content';

export const getPublishedPosts = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
};

// Translations have their own routes, but occupy one entry in lists and RSS.
export const getPostGroups = async () => {
  const posts = await getPublishedPosts();
  const groups = new Map<string, typeof posts>();
  for (const post of posts) {
    const key = post.data.translationKey ?? post.slug;
    groups.set(key, [...(groups.get(key) ?? []), post]);
  }
  return [...groups.values()].map((translations) => ({
    ...(translations.find((post) => post.data.lang === 'zh-CN') ?? translations[0]),
    translations,
  }));
};

export const getAllCategories = async () => {
  const posts = await getPostGroups();
  const map = new Map<string, { label: string; slug: string; count: number }>();
  for (const post of posts) {
    const existing = map.get(post.data.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(post.data.categorySlug, {
        label: post.data.category,
        slug: post.data.categorySlug,
        count: 1,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
};

export const getAllTags = async () => {
  const posts = await getPostGroups();
  const map = new Map<string, { label: string; slug: string; count: number }>();
  for (const post of posts) {
    post.data.tags.forEach((tag, index) => {
      const slug = post.data.tagSlugs[index] ?? tag;
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { label: tag, slug, count: 1 });
      }
    });
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
};
