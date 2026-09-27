import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'prompt', manifest: { name: 'Yomi', short_name: 'Yomi', display: 'standalone', theme_color: '#0b0b0d', background_color: '#0b0b0d', icons: [{ src: '/yomi-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { globPatterns: ['**/*.{js,css,html,svg}'], runtimeCaching: [] } })],
  server: { proxy: { '/api': 'http://localhost:8787' } }
});
