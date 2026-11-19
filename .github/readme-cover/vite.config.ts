import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4410, strictPort: true },
  resolve: { dedupe: ['react', 'react-dom'] },
})
