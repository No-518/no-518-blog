/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        primaryForeground: 'hsl(var(--primary-foreground))',
      },
      fontFamily: {
        sans: ['"Satoshi"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
