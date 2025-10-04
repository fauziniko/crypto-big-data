<template>
  <div class="historical-data-table">
    <!-- Table Header with Export Button -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-display font-bold text-text-primary">
          Historical Data
        </h3>
        <p class="text-sm text-text-tertiary">
          {{ data.length }} data points
        </p>
      </div>
      
      <button
        @click="exportData"
        class="btn-secondary flex items-center gap-2"
        :disabled="data.length === 0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Export CSV
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-text-tertiary">Loading historical data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <svg class="w-16 h-16 text-danger mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-xl font-display font-bold text-text-primary mb-2">Error Loading Data</h3>
      <p class="text-text-tertiary">{{ error }}</p>
    </div>

    <!-- Table -->
    <div v-else-if="data.length > 0" class="overflow-x-auto rounded-xl border border-finance-border">
      <table class="w-full">
        <thead class="bg-finance-surface/50 border-b border-finance-border">
          <tr>
            <th class="py-3 px-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Time
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Open
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              High
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Low
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Close
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Change
            </th>
            <th class="py-3 px-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Volume
            </th>
          </tr>
        </thead>
        <tbody class="bg-finance-card divide-y divide-finance-border">
          <tr
            v-for="(candle, index) in paginatedData"
            :key="index"
            class="hover:bg-finance-surface/30 transition-colors"
          >
            <td class="py-3 px-4">
              <div class="text-sm font-medium text-text-primary">
                {{ formatDateTime(candle.timestamp) }}
              </div>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-mono text-sm text-text-primary">
                {{ formatCurrency(candle.open) }}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-mono text-sm text-success">
                {{ formatCurrency(candle.high) }}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-mono text-sm text-danger">
                {{ formatCurrency(candle.low) }}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-mono text-sm font-semibold text-text-primary">
                {{ formatCurrency(candle.close) }}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <div 
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold"
                :class="getChangePercentage(candle) >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'"
              >
                {{ getChangePercentage(candle) >= 0 ? '↑' : '↓' }} 
                {{ formatPercentage(getChangePercentage(candle)) }}
              </div>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-mono text-sm text-text-secondary">
                {{ formatLargeNumber(candle.volume || 0) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 class="text-xl font-display font-bold text-text-primary mb-2">No Data Available</h3>
      <p class="text-text-tertiary">Select a date range and click "Load Data" to view historical data</p>
    </div>

    <!-- Pagination -->
    <div v-if="data.length > itemsPerPage" class="mt-4 flex items-center justify-between">
      <div class="text-sm text-text-tertiary">
        Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, data.length) }} of {{ data.length }} entries
      </div>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm bg-finance-surface border border-finance-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1.5 text-sm bg-finance-surface border border-finance-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CandleData } from '~/types/crypto'
import { formatCurrency, formatLargeNumber, formatPercentage } from '~/utils/formatters'

const props = defineProps<{
  data: CandleData[]
  loading?: boolean
  error?: string | null
  symbol?: string
}>()

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(50)

const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage.value))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.data.slice(start, end)
})

// Format date time
function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp)
  const dateStr = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit',
    year: 'numeric'
  })
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
  return `${dateStr} ${timeStr}`
}

// Calculate change percentage
function getChangePercentage(candle: CandleData): number {
  if (candle.open === 0) return 0
  return ((candle.close - candle.open) / candle.open) * 100
}

// Export to CSV
function exportData() {
  if (props.data.length === 0) return

  const headers = ['Timestamp', 'Date', 'Time', 'Open', 'High', 'Low', 'Close', 'Change %', 'Volume']
  const rows = props.data.map(candle => {
    const date = new Date(candle.timestamp)
    const dateStr = date.toLocaleDateString('en-US')
    const timeStr = date.toLocaleTimeString('en-US', { hour12: false })
    const change = getChangePercentage(candle)
    
    return [
      candle.timestamp,
      dateStr,
      timeStr,
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      change.toFixed(2),
      candle.volume
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  const symbol = props.symbol || 'crypto'
  const timestamp = new Date().toISOString().split('T')[0]
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${symbol}_historical_${timestamp}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
