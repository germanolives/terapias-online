import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 1. EL SITIO (CRÍTICO para el Sitemap y SEO)
  site: 'https://terapiasonline.com.ar', 

  vite: {
    plugins: [tailwindcss()],
  },

  // 2. MODO DE SALIDA
  // 'server' es genial para las Actions de contacto, 
  // pero requiere que el 'site' esté definido arriba.
  output: 'server',

  adapter: vercel({
    webAnalytics: { enabled: true }, // Tip: Vercel te dará métricas gratis
  }),

  integrations: [sitemap()],
});