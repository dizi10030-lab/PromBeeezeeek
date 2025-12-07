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
      // Correctly polyfill process.env as an object literal. 
      // This ensures that accessing 'process.env' does not throw "process is not defined".
      'process.env': {
        API_KEY: env.API_KEY
      }
    }
  };
});