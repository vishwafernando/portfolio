import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config//
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { 
        manualChunks: {
          // Separate React and React DOM into their own chunk
          'react-vendor': ['react', 'react-dom'],
          
          // Separate Three.js and related libraries
          'three-vendor': [
            'three', 
            '@react-three/fiber', 
            '@react-three/drei'
          ],
          
          // Separate Spline into its own chunk (lazy loaded)
          'spline-vendor': ['@splinetool/react-spline'],
          
          // Separate animation libraries
          'animation-vendor': ['gsap', 'framer-motion', 'split-type'],
          
          // Separate utility libraries
          'utils-vendor': [
            '@honeybadger-io/react',
            '@honeybadger-io/js',
            'react-intersection-observer'
          ]
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 2000,
    // Enable source maps for better debugging
    sourcemap: false, // Disable in production for smaller bundles
    // Minify for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'styled-components',
      'lodash.debounce' // Include lodash.debounce to fix ES module issue
    ],
    exclude: [
      '@splinetool/react-spline' // Keep this excluded for lazy loading
    ],
    // Force pre-bundling of problematic dependencies
    force: true
  },
  // Add resolve configuration to handle module resolution
  resolve: {
    alias: {
      // Force lodash.debounce to use the correct path
      'lodash.debounce': 'lodash.debounce'
    }
  },
  // Configure how to handle different module types
  ssr: {
    noExternal: ['lodash.debounce']
  },
  // Define configuration for better module handling
  define: {
    global: 'globalThis',
  }
})
