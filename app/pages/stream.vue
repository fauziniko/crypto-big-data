<template>
  <div class="min-h-screen">
    <!-- Header -->
    <HeaderSimple />

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8 max-w-7xl">
      <!-- Page Title & Description -->
      <div class="mb-8 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-display font-bold text-text-primary mb-2">Data Stream</h1>
            <p class="text-text-tertiary">Real-time cryptocurrency market data with live updates every 5 seconds</p>
          </div>
          
          <!-- Refresh Button -->
          <button 
            @click="refreshData"
            class="btn-secondary"
            :disabled="isRefreshing"
          >
            <svg 
              class="w-4 h-4" 
              :class="{ 'animate-spin': isRefreshing }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Crypto Selector -->
      <div class="card mb-6 animate-slide-up">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-display font-bold text-text-primary">Select Cryptocurrency</h2>
          <div class="text-sm text-text-tertiary">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
              <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span class="font-semibold text-success">Live Streaming</span>
            </span>
          </div>
        </div>

        <!-- Crypto Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            v-for="asset in assets"
            :key="asset.symbol"
            @click="selectCrypto(asset.symbol)"
            class="relative p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg"
            :class="selectedCrypto === asset.symbol 
              ? 'border-primary bg-primary/5 shadow-md' 
              : 'border-finance-border bg-finance-surface hover:border-finance-divider'"
          >
            <!-- Selected Indicator -->
            <div 
              v-if="selectedCrypto === asset.symbol"
              class="absolute top-3 right-3"
            >
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center gap-4 mb-3">
              <CryptoIcon :symbol="asset.symbol" size="lg" />
              <div class="text-left">
                <div class="font-display font-bold text-lg text-text-primary">{{ asset.symbol.split('/')[0] }}</div>
                <div class="text-xs text-text-tertiary">{{ asset.name }}</div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-baseline justify-between">
                <span class="text-xs text-text-tertiary">Price</span>
                <span class="font-mono font-bold text-text-primary tabular-nums">
                  {{ formatCurrency(asset.price, getDecimals(asset.symbol)) }}
                </span>
              </div>
              <div class="flex items-baseline justify-between">
                <span class="text-xs text-text-tertiary">24h Change</span>
                <span 
                  class="font-bold text-sm tabular-nums"
                  :class="asset.change24h >= 0 ? 'text-success' : 'text-danger'"
                >
                  {{ asset.change24h >= 0 ? '↑' : '↓' }} {{ formatPercentage(asset.change24h) }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Data Stream Table -->
      <div v-if="selectedCrypto" class="card animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-display font-bold text-text-primary mb-1">
              {{ selectedAsset?.name }} Live Data Stream
            </h2>
            <p class="text-sm text-text-tertiary">
              Real-time market data updates • Last update: {{ timeAgo }}
            </p>
          </div>
          
          <!-- Export Button -->
          <button @click="exportStreamData" class="btn-primary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export Data
          </button>
        </div>

        <!-- Live Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="stat-card">
            <div class="text-xs font-medium text-text-tertiary mb-2">Current Price</div>
            <div class="text-2xl font-display font-bold text-text-primary tabular-nums">
              {{ formatCurrency(selectedAsset?.price || 0, getDecimals(selectedCrypto)) }}
            </div>
          </div>
          
          <div class="stat-card">
            <div class="text-xs font-medium text-text-tertiary mb-2">24h High</div>
            <div class="text-2xl font-display font-bold text-text-primary tabular-nums">
              {{ formatCurrency(selectedAsset?.high24h || 0, getDecimals(selectedCrypto)) }}
            </div>
          </div>
          
          <div class="stat-card">
            <div class="text-xs font-medium text-text-tertiary mb-2">24h Low</div>
            <div class="text-2xl font-display font-bold text-text-primary tabular-nums">
              {{ formatCurrency(selectedAsset?.low24h || 0, getDecimals(selectedCrypto)) }}
            </div>
          </div>
          
          <div class="stat-card">
            <div class="text-xs font-medium text-text-tertiary mb-2">24h Volume</div>
            <div class="text-2xl font-display font-bold text-text-primary tabular-nums">
              {{ formatLargeNumber(selectedAsset?.volume24h || 0) }}
            </div>
          </div>
        </div>

        <!-- Data Stream Table -->
        <div class="overflow-x-auto -mx-6 px-6">
          <table class="w-full">
            <thead>
              <tr class="border-b border-finance-border">
                <th class="text-left py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Timestamp</th>
                <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Price</th>
                <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Change</th>
                <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Volume</th>
                <th class="text-right py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Market Cap</th>
                <th class="text-center py-3 px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in streamData"
                :key="index"
                class="table-row"
                :class="getRowFlashClass(data)"
              >
                <td class="py-4 px-4">
                  <div class="text-sm font-medium text-text-primary">
                    {{ formatTime(data.timestamp) }}
                  </div>
                  <div class="text-xs text-text-muted">
                    {{ formatDate(data.timestamp) }}
                  </div>
                </td>
                <td class="py-4 px-4 text-right">
                  <span class="font-mono font-bold text-base text-text-primary tabular-nums">
                    {{ formatCurrency(data.price, getDecimals(selectedCrypto)) }}
                  </span>
                </td>
                <td class="py-4 px-4 text-right">
                  <div 
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-sm tabular-nums"
                    :class="data.change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'"
                  >
                    {{ data.change >= 0 ? '↑' : '↓' }} {{ formatPercentage(data.change) }}
                  </div>
                </td>
                <td class="py-4 px-4 text-right">
                  <div class="text-sm text-text-secondary font-mono tabular-nums">
                    {{ formatLargeNumber(data.volume) }}
                  </div>
                </td>
                <td class="py-4 px-4 text-right">
                  <div class="text-sm text-text-secondary font-mono tabular-nums">
                    {{ formatLargeNumber(data.marketCap) }}
                  </div>
                </td>
                <td class="py-4 px-4">
                  <div class="flex items-center justify-center">
                    <div class="w-16 h-8">
                      <MiniSparkline :symbol="selectedCrypto" :change="data.change" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Info -->
        <div class="mt-6 flex items-center justify-between text-sm text-text-tertiary border-t border-finance-border pt-4">
          <div>
            Showing <span class="font-semibold text-text-secondary">{{ streamData.length }}</span> real-time data points
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Auto-updating every 5 seconds</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center py-16 animate-fade-in">
        <svg class="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
        </svg>
        <h3 class="text-xl font-display font-bold text-text-primary mb-2">Select a Cryptocurrency</h3>
        <p class="text-text-tertiary">Choose a crypto from the cards above to view its live data stream</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { CryptoAsset } from '~/types/crypto'
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercentage,
  formatTimeAgo
} from '~/utils/formatters'

const { assets, lastUpdate } = useCryptoData()

const selectedCrypto = ref<string>('')
const streamData = ref<any[]>([])
const isRefreshing = ref(false)
const previousPrices = ref<Map<number, number>>(new Map())

// Computed
const selectedAsset = computed(() => {
  return assets.value.find(a => a.symbol === selectedCrypto.value)
})

const timeAgo = computed(() => {
  if (!lastUpdate.value) return 'Never'
  return formatTimeAgo(lastUpdate.value)
})

// Methods
const selectCrypto = (symbol: string) => {
  selectedCrypto.value = symbol
  generateStreamData()
}

const getDecimals = (symbol: string) => {
  return symbol === 'XRP/USD' ? 4 : 2
}

const generateStreamData = () => {
  if (!selectedAsset.value) return

  const data = []
  const basePrice = selectedAsset.value.price
  const now = Date.now()

  // Generate 20 data points (simulated historical data)
  for (let i = 19; i >= 0; i--) {
    const timestamp = now - (i * 5000) // Every 5 seconds
    const randomChange = (Math.random() - 0.5) * 4 // -2% to +2%
    const price = basePrice * (1 + randomChange / 100)
    const volume = selectedAsset.value.volume24h * (0.8 + Math.random() * 0.4)
    const marketCap = price * 19000000 // Simplified market cap calculation

    data.push({
      timestamp,
      price,
      change: randomChange,
      volume,
      marketCap
    })
  }

  streamData.value = data
}

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getRowFlashClass = (data: any) => {
  const prevPrice = previousPrices.value.get(data.timestamp)
  
  if (prevPrice === undefined) {
    previousPrices.value.set(data.timestamp, data.price)
    return ''
  }
  
  if (data.price > prevPrice) {
    previousPrices.value.set(data.timestamp, data.price)
    return 'flash-up'
  } else if (data.price < prevPrice) {
    previousPrices.value.set(data.timestamp, data.price)
    return 'flash-down'
  }
  
  return ''
}

const refreshData = () => {
  isRefreshing.value = true
  generateStreamData()
  setTimeout(() => {
    isRefreshing.value = false
  }, 500)
}

const exportStreamData = () => {
  const { exportToCSV } = useDataExport()
  const csvData = streamData.value.map(d => ({
    timestamp: new Date(d.timestamp).toISOString(),
    price: d.price,
    change: d.change,
    volume: d.volume,
    marketCap: d.marketCap
  }))
  
  exportToCSV(
    csvData,
    `${selectedCrypto.value.replace('/', '-')}-stream-${Date.now()}.csv`
  )
}

// Watch for asset changes
watch(() => selectedAsset.value?.price, () => {
  if (selectedCrypto.value && streamData.value.length > 0) {
    // Update the latest data point
    const now = Date.now()
    const newData = {
      timestamp: now,
      price: selectedAsset.value?.price || 0,
      change: selectedAsset.value?.change24h || 0,
      volume: selectedAsset.value?.volume24h || 0,
      marketCap: (selectedAsset.value?.price || 0) * 19000000
    }
    
    streamData.value.push(newData)
    // Keep only last 20 items
    if (streamData.value.length > 20) {
      streamData.value.shift()
    }
  }
})

// Auto-refresh every 5 seconds
onMounted(() => {
  const interval = setInterval(() => {
    if (selectedCrypto.value) {
      // Simulate new data point
      const asset = selectedAsset.value
      if (asset) {
        const now = Date.now()
        const newData = {
          timestamp: now,
          price: asset.price,
          change: asset.change24h,
          volume: asset.volume24h,
          marketCap: asset.price * 19000000
        }
        
        streamData.value.push(newData)
        if (streamData.value.length > 20) {
          streamData.value.shift()
        }
      }
    }
  }, 5000)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>
