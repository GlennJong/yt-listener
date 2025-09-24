import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo';
  return {
    base: './',
    plugins: [react()],
    server: {
      host: true,
      port: 8000,
      sourcemap: true,
    },
    build: {
      outDir: isDemo ? 'dist/demo' : 'dist'
    },
    define: {
      'import.meta.env.VITE_IS_DEMO': JSON.stringify(isDemo)
    }
  }
})
