import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Correctly polyfill process.env.
      // JSON.stringify is CRITICAL here, otherwise the key value is injected as raw code
      // (e.g. AIza... becomes a variable name) causing syntax errors or undefined behavior.
      'process.env': JSON.stringify({
        API_KEY: env.API_KEY || env.VITE_API_KEY,
        NODE_ENV: process.env.NODE_ENV || 'production'
      })
    }
  };
});