import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// Salida estática (HTML prerenderizado, legible por crawlers y buscadores).
// El endpoint /api/contact se marca con `prerender = false` y lo sirve el
// adaptador de Vercel como función serverless.
export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  output: 'static',
});
