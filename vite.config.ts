import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Это позволяет использовать process.env.API_KEY в клиентском коде после сборки
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});