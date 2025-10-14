import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { networkInterfaces } from 'os';

const getLocalIP = () => {
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        const ip = net.address;
        // Return first local network IP (skip VPN)
        if (ip.startsWith('192.168.') || ip.startsWith('10.')) {
          return ip;
        }
      }
    }
  }
  
  return 'localhost';
};
const localIP = getLocalIP();

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './resources/js'),
      'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
    },
  },
  ...(process.env.NODE_ENV === 'development' && { // Only apply server config in dev mode
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: {
        host: localIP, // Auto-detects server IP
        port: 5173,
      },
    },
  }),
});
