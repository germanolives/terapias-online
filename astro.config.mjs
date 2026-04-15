import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  // <--- AGREGÁ ESTA LÍNEA AQUÍ
  output: 'server',

  adapter: vercel(),
  integrations: [sitemap()],
});