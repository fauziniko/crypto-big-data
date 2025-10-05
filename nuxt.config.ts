// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      title: 'CryptoStream - Real-time Crypto Analysis',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Real-time cryptocurrency market analysis and data visualization platform' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false // Disabled for build due to path with spaces
  },

  runtimeConfig: {
    public: {
      // Using Binance API only (no API key required)
    }
  },

  // Production optimizations
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    // Add CORS headers for API routes
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  },

  // Build optimizations
  experimental: {
    payloadExtraction: false
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'apexcharts': ['apexcharts', 'vue3-apexcharts']
          }
        }
      }
    }
  }
})
