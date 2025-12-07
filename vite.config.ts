import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Получаем ключ из переменных среды Vercel (process.env) или локального .env
  const apiKey = process.env.API_KEY || env.API_KEY || env.VITE_API_KEY;

  return {
    plugins: [react()],
    define: {
      // ЖЕСТКАЯ ЗАМЕНА: В коде 'process.env.API_KEY' будет заменено на реальную строку с ключом.
      // Это гарантирует, что ключ попадет в браузерный бандл.
      'process.env.API_KEY': JSON.stringify(apiKey),
      
      // Заглушка для объекта process, чтобы избежать ошибки "process is not defined"
      'process.env': {}
    }
  };
});