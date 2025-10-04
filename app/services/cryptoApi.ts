import type { CryptoAsset, CandleData } from '~/types/crypto'

/**
 * API service for fetching real cryptocurrency data
 */

// API Provider type
type ApiProvider = 'coingecko' | 'binance' | 'cryptocompare'

interface ApiConfig {
  provider: ApiProvider
  apiKey?: string
}

/**
 * CoinGecko API Service (Free tier available)
 */
class CoinGeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3'
  private apiKey?: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  private getHeaders(): HeadersInit {
    return this.apiKey 
      ? { 'x-cg-demo-api-key': this.apiKey }
      : {}
  }

  async getMarketData(symbols: string[] = ['bitcoin', 'ethereum', 'solana', 'ripple']): Promise<CryptoAsset[]> {
    try {
      const ids = symbols.join(',')
      const response = await fetch(
        `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
        { headers: this.getHeaders() }
      )

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      const data = await response.json()
      
      return data.map((coin: any) => ({
        symbol: `${coin.symbol.toUpperCase()}/USD`,
        name: coin.name,
        price: coin.current_price,
        volume24h: coin.total_volume,
        change24h: coin.price_change_percentage_24h || 0,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        lastUpdate: new Date()
      }))
    } catch (error) {
      console.error('Error fetching CoinGecko data:', error)
      throw error
    }
  }

  async getHistoricalData(coinId: string = 'bitcoin', days: number = 1): Promise<CandleData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
        { headers: this.getHeaders() }
      )

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      const data = await response.json()
      
      return data.map((candle: any) => ({
        timestamp: candle[0], 
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: 0 
      }))
    } catch (error) {
      console.error('Error fetching CoinGecko historical data:', error)
      throw error
    }
  }
}

/**
 * Binance API Service 
 */
class BinanceService {
  private baseUrl = 'https://api.binance.com/api/v3'

  async getMarketData(symbols: string[] = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT']): Promise<CryptoAsset[]> {
    try {
      const promises = symbols.map(async (symbol) => {
        // Get 24hr ticker
        const tickerResponse = await fetch(`${this.baseUrl}/ticker/24hr?symbol=${symbol}`)
        if (!tickerResponse.ok) throw new Error(`Binance API error: ${tickerResponse.status}`)
        const ticker = await tickerResponse.json()

        return {
          symbol: symbol.replace('USDT', '/USD'),
          name: this.getNameFromSymbol(symbol),
          price: parseFloat(ticker.lastPrice),
          volume24h: parseFloat(ticker.quoteVolume),
          change24h: parseFloat(ticker.priceChangePercent),
          high24h: parseFloat(ticker.highPrice),
          low24h: parseFloat(ticker.lowPrice),
          lastUpdate: new Date()
        }
      })

      return await Promise.all(promises)
    } catch (error) {
      console.error('Error fetching Binance data:', error)
      throw error
    }
  }

  async getKlines(symbol: string = 'BTCUSDT', interval: string = '5m', limit: number = 60): Promise<CandleData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      )

      if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`)
      }

      const data = await response.json()
      
      return data.map((candle: any) => ({
        timestamp: candle[0], // Keep as number (Unix timestamp in ms)
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5])
      }))

    } catch (error) {
      console.error('Error fetching Binance klines:', error)
      throw error
    }
  }

  private getNameFromSymbol(symbol: string): string {
    const names: Record<string, string> = {
      'BTCUSDT': 'Bitcoin',
      'ETHUSDT': 'Ethereum',
      'SOLUSDT': 'Solana',
      'XRPUSDT': 'Ripple'
    }
    return names[symbol] || symbol
  }
}

/**
 * CryptoCompare API Service (Requires API key)
 */
class CryptoCompareService {
  private baseUrl = 'https://min-api.cryptocompare.com/data'
  private apiKey: string

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('CryptoCompare API key is required')
    }
    this.apiKey = apiKey
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Apikey ${this.apiKey}`
    }
  }

  async getMarketData(symbols: string[] = ['BTC', 'ETH', 'SOL', 'XRP']): Promise<CryptoAsset[]> {
    try {
      const fsyms = symbols.join(',')
      const response = await fetch(
        `${this.baseUrl}/pricemultifull?fsyms=${fsyms}&tsyms=USD`,
        { headers: this.getHeaders() }
      )

      if (!response.ok) {
        throw new Error(`CryptoCompare API error: ${response.status}`)
      }

      const data = await response.json()
      
      return symbols.map((symbol) => {
        const raw = data.RAW[symbol]?.USD
        const display = data.DISPLAY[symbol]?.USD
        
        if (!raw) return null

        return {
          symbol: `${symbol}/USD`,
          name: this.getNameFromSymbol(symbol),
          price: raw.PRICE,
          volume24h: raw.VOLUME24HOURTO,
          change24h: raw.CHANGEPCT24HOUR,
          high24h: raw.HIGH24HOUR,
          low24h: raw.LOW24HOUR,
          lastUpdate: new Date(raw.LASTUPDATE * 1000)
        }
      }).filter(Boolean) as CryptoAsset[]
    } catch (error) {
      console.error('Error fetching CryptoCompare data:', error)
      throw error
    }
  }

  async getHistoricalData(symbol: string = 'BTC', limit: number = 60): Promise<CandleData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/histominute?fsym=${symbol}&tsym=USD&limit=${limit}`,
        { headers: this.getHeaders() }
      )

      if (!response.ok) {
        throw new Error(`CryptoCompare API error: ${response.status}`)
      }

      const data = await response.json()
      
      return data.Data.Data.map((candle: any) => ({
        timestamp: candle.time * 1000, // Convert to milliseconds
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volumeto
      }))
    } catch (error) {
      console.error('Error fetching CryptoCompare historical data:', error)
      throw error
    }
  }

  private getNameFromSymbol(symbol: string): string {
    const names: Record<string, string> = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'SOL': 'Solana',
      'XRP': 'Ripple'
    }
    return names[symbol] || symbol
  }
}

/**
 * Main Crypto API Service Factory
 */
export class CryptoApiService {
  private service: CoinGeckoService | BinanceService | CryptoCompareService

  constructor(config: ApiConfig) {
    switch (config.provider) {
      case 'coingecko':
        this.service = new CoinGeckoService(config.apiKey)
        break
      case 'binance':
        this.service = new BinanceService()
        break
      case 'cryptocompare':
        if (!config.apiKey) {
          throw new Error('CryptoCompare requires an API key')
        }
        this.service = new CryptoCompareService(config.apiKey)
        break
      default:
        throw new Error(`Unsupported API provider: ${config.provider}`)
    }
  }

  async getMarketData(symbols?: string[]): Promise<CryptoAsset[]> {
    return this.service.getMarketData(symbols)
  }

  async getHistoricalData(symbol?: string, options?: any): Promise<CandleData[]> {
    if (this.service instanceof CoinGeckoService) {
      return this.service.getHistoricalData(symbol, options?.days || 1)
    } else if (this.service instanceof BinanceService) {
      return this.service.getKlines(symbol, options?.interval || '5m', options?.limit || 60)
    } else if (this.service instanceof CryptoCompareService) {
      return this.service.getHistoricalData(symbol, options?.limit || 60)
    }
    throw new Error('Unsupported operation')
  }
}

/**
 * Create API service instance from runtime config
 */
export function useCryptoApi() {
  const config = useRuntimeConfig()
  
  const provider = (config.public.cryptoApiProvider || 'coingecko') as ApiProvider
  const apiKey = (config.public.coingeckoApiKey || 
                 config.public.cryptocompareApiKey || 
                 undefined) as string | undefined

  return new CryptoApiService({ provider, apiKey })
}
