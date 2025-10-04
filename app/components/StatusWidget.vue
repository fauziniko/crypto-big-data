<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <!-- Portfolio Value -->
    <div class="stat-card group">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <svg class="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-xs font-medium text-text-tertiary mb-1">Portfolio</p>
        <p class="text-2xl font-display font-bold text-text-primary mb-1 tabular-nums">$128,109.38</p>
        <div class="flex items-center gap-1.5">
          <span class="text-success text-sm font-semibold">↑ 1.57%</span>
          <span class="text-xs text-text-muted">Today</span>
        </div>
      </div>
    </div>

    <!-- New Assets -->
    <div class="stat-card group">
      <div class="flex items-start justify-between mb-3">
        <div class="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <svg class="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-xs font-medium text-text-tertiary mb-1">New assets</p>
        <p class="text-2xl font-display font-bold text-text-primary mb-1 tabular-nums">1292</p>
        <div class="flex items-center gap-1.5">
          <span class="text-danger text-sm font-semibold">↓ 0.02%</span>
          <span class="text-xs text-text-muted">vs yesterday</span>
        </div>
      </div>
    </div>

    <!-- Top Gainers -->
    <div class="stat-card group">
      <div class="flex items-start justify-between mb-3">
        <div class="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <svg class="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-xs font-medium text-text-tertiary mb-1">Top gainers</p>
        <p class="text-2xl font-display font-bold text-text-primary mb-1 tabular-nums">{{ topGainer }}</p>
        <div class="flex items-center gap-1.5">
          <span class="text-success text-sm font-semibold">↑ 2.11%</span>
          <span class="text-xs text-text-muted">24h change</span>
        </div>
      </div>
    </div>

    <!-- Market Cap -->
    <div class="stat-card group">
      <div class="flex items-start justify-between mb-3">
        <div class="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <svg class="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-xs font-medium text-text-tertiary mb-1">Market cap</p>
        <p class="text-2xl font-display font-bold text-text-primary mb-1 tabular-nums">$12,134.15</p>
        <div class="flex items-center gap-1.5">
          <span class="text-success text-sm font-semibold">↑ 3.45%</span>
          <span class="text-xs text-text-muted">This week</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTimeAgo } from '~/utils/formatters'

const { assets, candleData, lastUpdate, isLive } = useCryptoData()

const topGainer = computed(() => {
  if (!assets.value || assets.value.length === 0) return 'N/A'
  const sorted = [...assets.value].sort((a, b) => b.change24h - a.change24h)
  return sorted[0]?.symbol.split('/')[0] || 'N/A'
})

const timeAgo = computed(() => {
  if (!lastUpdate.value) return 'Never'
  return formatTimeAgo(lastUpdate.value)
})
</script>
