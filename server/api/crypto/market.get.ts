interface BinanceTickerResponse {
  lastPrice: string
  quoteVolume: string
  priceChangePercent: string
  highPrice: string
  lowPrice: string
}

interface CryptoAsset {
  symbol: string
  name: string
  price: number
  volume24h: number
  change24h: number
  high24h: number
  low24h: number
  lastUpdate: Date
}

export default defineEventHandler(async (event): Promise<CryptoAsset[]> => {
  try {
    // Fetch from Binance API only
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT']
    
    const promises: Promise<CryptoAsset>[] = symbols.map(async (symbol): Promise<CryptoAsset> => {
      const tickerResponse: BinanceTickerResponse = await $fetch<BinanceTickerResponse>(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
        {
          retry: 2,
          timeout: 10000,
        }
      )
      
      return {
        symbol: symbol.replace('USDT', '/USD'),
        name: getNameFromSymbol(symbol),
        price: parseFloat(tickerResponse.lastPrice),
        volume24h: parseFloat(tickerResponse.quoteVolume),
        change24h: parseFloat(tickerResponse.priceChangePercent),
        high24h: parseFloat(tickerResponse.highPrice),
        low24h: parseFloat(tickerResponse.lowPrice),
        lastUpdate: new Date()
      }
    })
    
    const data: CryptoAsset[] = await Promise.all(promises)
    return data
    
  } catch (error: any) {
    console.error('Error fetching market data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Terdapat Kesalahan pada API Binance',
      message: error.cause?.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' 
        ? 'Tidak dapat memverifikasi sertifikat SSL dari server Binance'
        : error.message || 'Tidak dapat terhubung ke server Binance'
    })
  }
})

function getNameFromSymbol(symbol: string): string {
  const names: Record<string, string> = {
    'BTCUSDT': 'Bitcoin',
    'ETHUSDT': 'Ethereum',
    'SOLUSDT': 'Solana',
    'XRPUSDT': 'Ripple'
  }
  return names[symbol] || symbol
}
