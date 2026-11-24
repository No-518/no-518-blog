import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()),
    tagSlugs: z.array(z.string()),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['zh-CN', 'en']).default('zh-CN'),
    translationKey: z.string().optional(),
    toc: z.array(z.object({ depth: z.number(), slug: z.string(), text: z.string() })).optional(),
  }),
});

export const collections = { blog };
