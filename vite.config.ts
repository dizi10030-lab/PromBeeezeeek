import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Получаем ключ из переменных среды Vercel (process.env) или локального .env
  // Порядок важен: сначала системные переменные Vercel
  const apiKey = process.env.API_KEY || env.API_KEY || env.VITE_API_KEY;

  console.log(`[Vite Build] API Key status: ${apiKey ? 'Found' : 'Missing'}`);

  return {
    plugins: [react()],
    define: {
      // Создаем глобальную константу с именем __APP_API_KEY__.
      // Значение оборачивается в JSON.stringify, чтобы в JS коде это стало строкой "ваш_ключ".
      // Если ключа нет, будет значение undefined.
      '__APP_API_KEY__': JSON.stringify(apiKey),
    }
  };
});