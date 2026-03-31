import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/trauma-informed-ui/' : '/',
  resolve: {
    alias: {
      'trauma-informed-ui': resolve(__dirname, '../src/index.ts'),
    },
  },
})
