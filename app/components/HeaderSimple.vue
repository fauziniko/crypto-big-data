<template>
  <header class="bg-finance-surface/95 border-b border-finance-border sticky top-0 z-50 backdrop-blur-md shadow-sm">
    <div class="container mx-auto px-6">
      <!-- Main Header -->
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center gap-3">
          <div>
            <h1 class="text-lg font-display font-bold text-text-primary tracking-tight">CryptoStream</h1>
          </div>
        </div>

        <!-- Right Section - Simple Info -->
        <div class="flex items-center gap-4">
          <!-- Refresh Button -->
          <button
            @click="handleRefresh"
            :disabled="isRefreshing"
            class="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all disabled:opacity-50"
            title="Refresh data"
          >
            <svg 
              :class="['w-4 h-4', isRefreshing && 'animate-spin']"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span class="text-sm font-medium hidden sm:inline">Refresh</span>
          </button>

          <!-- Market Status -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span class="text-xs font-semibold text-success">Live API</span>
          </div>

          <!-- Time Display -->
          <div class="hidden lg:flex items-center gap-2 text-sm text-text-tertiary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-medium tabular-nums">{{ currentTime }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs (Optional - Simple) -->
      <nav class="flex items-center gap-6 border-t border-finance-border py-3">
        <NuxtLink 
          to="/" 
          class="text-sm font-semibold pb-3 transition-colors"
          :class="$route.path === '/' ? 'text-text-primary border-b-2 border-primary' : 'text-text-tertiary hover:text-text-primary'"
        >
          Market Overview
        </NuxtLink>
        <NuxtLink 
          to="/stream" 
          class="text-sm font-semibold pb-3 transition-colors"
          :class="$route.path === '/stream' ? 'text-text-primary border-b-2 border-primary' : 'text-text-tertiary hover:text-text-primary'"
        >
          Data Stream
        </NuxtLink>
        
        <!-- Spacer -->
        <div class="flex-1"></div>
        
        <!-- Additional Info -->
        <div class="hidden lg:flex items-center gap-4 text-xs text-text-muted">
          <div class="flex items-center gap-1.5">
            <span>Global Market Cap:</span>
            <span class="font-semibold text-text-secondary">$1.71T</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span>24h Vol:</span>
            <span class="font-semibold text-text-secondary">$89.2B</span>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { refreshData } = useCryptoData()

const currentTime = ref('')
const isRefreshing = ref(false)

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  })
}

const handleRefresh = async () => {
  isRefreshing.value = true
  try {
    await refreshData()
  } catch (error) {
    console.error('Error refreshing data:', error)
  } finally {
    isRefreshing.value = false
  }
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000)
  
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>
