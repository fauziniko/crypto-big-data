<template>
  <div class="card animate-fade-in">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-display font-bold text-text-primary mb-1">Cryptocurrency Prices by Market Cap</h2>
        <p class="text-sm text-text-tertiary">
          The global crypto market cap is 
          <span class="font-semibold text-text-secondary">$1.71T</span>, 
          a <span class="text-success font-semibold">1.49%</span> increase over the last day.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-xs text-text-tertiary">
          <span v-if="lastUpdate">Updated {{ timeAgo }}</span>
        </div>
        <button class="flex items-center gap-2 px-3 py-2 bg-finance-hover rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          <span>Show Stats</span>
          <div class="w-10 h-5 bg-finance-border rounded-full relative">
            <div class="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
          </div>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto -mx-6 px-6">
      <table class="w-full">
        <thead>
          <tr class="border-b border-finance-border">
            <th class="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">#</th>
            <th class="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Name</th>
            <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Price</th>
            <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">24h Change</th>
            <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Volume 24h</th>
            <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(asset, index) in assets"
            :key="asset.symbol"
            class="table-row"
            :class="getPriceFlashClass(asset)"
          >
            <td class="py-4 px-4 text-text-tertiary text-sm font-medium">
              {{ index + 1 }}
            </td>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <CryptoIcon :symbol="asset.symbol" size="md" />
                <div>
                  <div class="font-semibold text-text-primary text-sm">{{ asset.symbol.split('/')[0] }}</div>
                  <div class="text-xs text-text-tertiary">{{ asset.name }}</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4 text-right">
              <span class="font-mono font-semibold text-text-primary tabular-nums text-base">
                {{ formatCurrency(asset.price, getDecimals(asset.symbol)) }}
              </span>
            </td>
            <td class="py-4 px-4 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <span 
                  class="font-bold text-sm tabular-nums"
                  :class="getPriceColorClass(asset.change24h)"
                >
                  {{ getPriceArrow(asset.change24h) }} {{ formatPercentage(asset.change24h) }}
                </span>
              </div>
            </td>
            <td class="py-4 px-4 text-right">
              <div class="text-sm text-text-secondary font-mono tabular-nums">
                {{ formatLargeNumber(asset.volume24h) }}
              </div>
              <div class="text-xs text-text-muted">
                ${{ formatLargeNumber(asset.volume24h) }}
              </div>
            </td>
            <td class="py-4 px-4 text-right">
              <div class="flex items-center justify-end">
                <div class="w-24 h-12">
                  <MiniSparkline :symbol="asset.symbol" :change="asset.change24h" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CryptoAsset } from '~/types/crypto'
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercentage,
  formatTimeAgo,
  getPriceColorClass,
  getPriceArrow
} from '~/utils/formatters'

const { assets, lastUpdate } = useCryptoData()

// Track previous prices for flash animation
const previousPrices = ref<Map<string, number>>(new Map())

// Time ago computed
const timeAgo = computed(() => {
  if (!lastUpdate.value) return ''
  return formatTimeAgo(lastUpdate.value)
})

// Get decimals based on symbol
const getDecimals = (symbol: string) => {
  return symbol === 'XRP/USD' ? 4 : 2
}

// Get flash class based on price direction
const getPriceFlashClass = (asset: CryptoAsset) => {
  const prevPrice = previousPrices.value.get(asset.symbol)
  
  if (prevPrice === undefined) {
    previousPrices.value.set(asset.symbol, asset.price)
    return ''
  }
  
  if (asset.price > prevPrice) {
    previousPrices.value.set(asset.symbol, asset.price)
    return 'flash-up'
  } else if (asset.price < prevPrice) {
    previousPrices.value.set(asset.symbol, asset.price)
    return 'flash-down'
  }
  
  return ''
}

// Update previous prices
watch(() => assets.value, () => {
  // This triggers reactivity for flash animation
}, { deep: true })
</script>
