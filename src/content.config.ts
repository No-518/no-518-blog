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
  }),
});

export const collections = { blog };
