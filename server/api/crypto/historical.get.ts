interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type BinanceKline = [number, string, string, string, string, string]

export default defineEventHandler(async (event): Promise<CandleData[]> => {
  try {
    const query = getQuery(event)
    const symbol = (query.symbol as string) || 'BTCUSDT'
    const interval = (query.interval as string) || '5m'
    const limit = parseInt((query.limit as string) || '60')
    
    // Fetch from Binance API only
    const data: BinanceKline[] = await $fetch<BinanceKline[]>(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
      {
        retry: 2,
        timeout: 10000,
      }
    )
    
    return data.map((candle: BinanceKline): CandleData => ({
      timestamp: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5])
    }))
  } catch (error: any) {
    console.error('Error fetching historical data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Terdapat Kesalahan pada API Binance',
      message: error.message || 'Tidak dapat terhubung ke server Binance'
    })
  }
})
