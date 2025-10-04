import { useCryptoStore } from '~/stores/crypto'

/**
 * Composable for managing crypto data and lifecycle
 */
export function useCryptoData() {
  const store = useCryptoStore()

  /**
   * Initialize data from API
   */
  const initialize = async () => {
    if (store.assets.length === 0) {
      await store.initializeData()
    }
  }

  /**
   * Refresh data from API
   */
  const refreshData = async () => {
    await store.refreshData()
  }

  /**
   * Start auto-refresh
   */
  const startAutoRefresh = (intervalSeconds: number = 30) => {
    store.startAutoRefresh(intervalSeconds)
  }

  /**
   * Stop auto-refresh
   */
  const stopAutoRefresh = () => {
    store.stopAutoRefresh()
  }

  /**
   * Cleanup on unmount
   */
  const cleanup = () => {
    store.stopAutoRefresh()
  }

  return {
    // State
    assets: computed(() => store.assets),
    candleData: computed(() => store.candleData),
    isLoading: computed(() => store.isLoading),
    isLive: computed(() => store.isLive),
    lastUpdate: computed(() => store.lastUpdate),
    selectedAsset: computed(() => store.selectedAsset),
    apiError: computed(() => store.apiError),
    
    // Getters
    latestCandle: computed(() => store.latestCandle),
    totalMarketCap: computed(() => store.totalMarketCap),
    
    // Actions
    initialize,
    refreshData,
    startAutoRefresh,
    stopAutoRefresh,
    cleanup,
    selectAsset: store.selectAsset
  }
}
