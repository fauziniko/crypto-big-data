import type { CryptoAsset, CandleData } from '~/types/crypto'

class ProxyApiService {
  async getMarketData(): Promise<CryptoAsset[]> {
    try {
      const data = await $fetch<CryptoAsset[]>('/api/crypto/market')
      return data
    } catch (error) {
      console.error('Error fetching market data:', error)
      throw error
    }
  }

  async getHistoricalData(symbol?: string, options?: any): Promise<CandleData[]> {
    try {
      const params: Record<string, string> = {}
      
      if (symbol) {
        if (symbol.includes('/')) {
          const parts = symbol.split('/')
          if (parts[0]) {
            params.symbol = parts[0] + 'USDT'
          }
        } else if (symbol.includes('USDT')) {
          params.symbol = symbol
        } else {
          params.symbol = symbol + 'USDT'
        }
      }
      
      if (options?.interval) params.interval = options.interval
      if (options?.limit) params.limit = options.limit.toString()
      
      const queryString = new URLSearchParams(params).toString()
      const url = queryString ? `/api/crypto/historical?${queryString}` : '/api/crypto/historical'
      const data = await $fetch<CandleData[]>(url)
      return data
    } catch (error) {
      console.error('Error fetching historical data:', error)
      throw error
    }
  }
}

export function useCryptoApi() {
  return new ProxyApiService()
}