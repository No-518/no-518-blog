// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

const platform = process.env.DEPLOYMENT_PLATFORM || 'vercel';
const isGitHub = platform === 'github';
const githubRepo = process.env.GH_REPO || '';
const base = isGitHub && githubRepo ? `/${githubRepo}` : '/';
const site = process.env.SITE_URL || 'https://example.com';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [tailwind(), mdx(), sitemap()],
});
