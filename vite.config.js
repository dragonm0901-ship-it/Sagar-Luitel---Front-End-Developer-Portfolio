import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy 3D libraries into their own chunk (includes maath since it depends on three)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          // Split animation libraries
          'vendor-motion': ['framer-motion', 'gsap', '@gsap/react'],
          // Split UI utilities
          'vendor-ui': ['lenis', 'lucide-react'],
        },
      },
    },
  },
})
