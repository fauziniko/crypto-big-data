<template>
  <div class="min-h-screen">
    <!-- Header -->
    <HeaderSimple />

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8 max-w-7xl">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p class="mt-4 text-text-secondary">Loading cryptocurrency data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="apiError" class="flex items-center justify-center py-20">
        <div class="text-center max-w-md">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-xl font-bold text-text-primary mb-2">Failed to Load Data</h2>
          <p class="text-text-secondary mb-6">{{ apiError }}</p>
          <button 
            @click="refreshData"
            class="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <template v-else>
        <!-- Status Widgets -->
        <section class="mb-8 animate-slide-up">
          <StatusWidget />
        </section>

      <!-- Market Overview Table -->
      <section id="market" class="mb-8 animate-fade-in" style="animation-delay: 0.1s">
        <CryptoTickerTable />
      </section>

      <!-- Candlestick Chart -->
      <section id="analisis" class="mb-8 animate-fade-in" style="animation-delay: 0.2s">
        <CandlestickChart />
      </section>

        <!-- Export Panel -->
        <section class="mb-8 animate-fade-in" style="animation-delay: 0.3s">
          <ExportPanel />
        </section>
      </template>

      <!-- Footer Info -->
      <section class="text-center text-text-tertiary text-sm py-12 border-t border-finance-border mt-12">
        <div class="mb-4">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-3">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span class="text-xs font-semibold text-text-secondary">Live Demo</span>
          </div>
        </div>
        <p class="mb-2 text-base">
          <strong class="text-text-primary font-display">CryptoStream</strong> 
        </p>
        <p class="text-xs text-text-muted max-w-2xl mx-auto mb-3">
          Real-time cryptocurrency market analysis with live data from API • 
          Binance supported
        </p>
        <p class="text-xs text-text-muted/70">
          Nuxt 3 • Vue 3 • TypeScript • TailwindCSS • ApexCharts • Pinia
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const { initialize, startAutoRefresh, cleanup, refreshData, isLoading, apiError } = useCryptoData()

onMounted(async () => {
  await initialize()
  startAutoRefresh(30)
})

onUnmounted(() => {
  cleanup()
})

useHead({
  title: 'CryptoStream - Real-time Crypto Market Analysis',
  meta: [
    { name: 'description', content: 'Real-time cryptocurrency market analysis platform with live data visualization and export capabilities for Big Data analysis' }
  ]
})
</script>
