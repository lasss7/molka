import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/valentine/",
  plugins: [react()],
  server: {
    allowedHosts: ["lore-copious-juridically.ngrok-free.dev"]
  }
})