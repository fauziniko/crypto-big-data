import { saveAs } from 'file-saver'
import type { CryptoAsset, CandleData, ExportData } from '~/types/crypto'

/**
 * Composable for exporting data in various formats
 */
export function useDataExport() {
  
  /**
   * Export candlestick data to CSV
   */
  const exportCandleDataToCSV = (data: CandleData[], filename: string = 'crypto-historical-data.csv') => {
    try {
      // Create CSV header
      const headers = ['timestamp', 'datetime', 'open', 'high', 'low', 'close', 'volume']
      
      // Create CSV rows
      const rows = data.map(candle => [
        candle.timestamp,
        new Date(candle.timestamp).toISOString(),
        candle.open,
        candle.high,
        candle.low,
        candle.close,
        candle.volume || ''
      ])
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
      saveAs(blob, filename)
      
      console.log('✅ CSV exported:', filename, `(${data.length} rows)`)
      
      return true
    } catch (error) {
      console.error('❌ Error exporting CSV:', error)
      return false
    }
  }

  /**
   * Export crypto assets to JSON
   */
  const exportAssetsToJSON = (assets: CryptoAsset[], filename: string = 'crypto-live-snapshot.json') => {
    try {
      const exportData: ExportData = {
        exportTime: new Date().toISOString(),
        assets: assets.map(asset => ({
          symbol: asset.symbol,
          name: asset.name,
          price: asset.price,
          volume24h: asset.volume24h,
          change24h: asset.change24h,
          lastUpdate: asset.lastUpdate
        }))
      }
      
      // Create formatted JSON
      const jsonContent = JSON.stringify(exportData, null, 2)
      
      // Create blob and download
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' })
      saveAs(blob, filename)
      
      console.log('✅ JSON exported:', filename, `(${assets.length} assets)`)
      
      return true
    } catch (error) {
      console.error('❌ Error exporting JSON:', error)
      return false
    }
  }

  /**
   * Export full dataset (both candles and assets)
   */
  const exportFullDataset = (
    candles: CandleData[], 
    assets: CryptoAsset[], 
    format: 'csv' | 'json' = 'json'
  ) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    
    if (format === 'csv') {
      exportCandleDataToCSV(candles, `crypto-dataset-${timestamp}.csv`)
    } else {
      const fullData = {
        exportTime: new Date().toISOString(),
        metadata: {
          candleCount: candles.length,
          assetCount: assets.length,
          exportFormat: 'full-dataset'
        },
        assets,
        historicalData: candles
      }
      
      const jsonContent = JSON.stringify(fullData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' })
      saveAs(blob, `crypto-full-dataset-${timestamp}.json`)
      
      console.log('✅ Full dataset exported')
    }
  }

  /**
   * Generic export to CSV function (for any data)
   */
  const exportToCSV = (data: any[], filename: string = 'export.csv') => {
    try {
      if (!data || data.length === 0) {
        console.warn('⚠️ No data to export')
        return false
      }

      // Get headers from first object
      const headers = Object.keys(data[0])
      
      // Create CSV rows
      const rows = data.map(item => 
        headers.map(header => {
          const value = item[header]
          // Handle values that might contain commas
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`
          }
          return value
        }).join(',')
      )
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows
      ].join('\n')
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
      saveAs(blob, filename)
      
      console.log('✅ CSV exported:', filename, `(${data.length} rows)`)
      
      return true
    } catch (error) {
      console.error('❌ Error exporting CSV:', error)
      return false
    }
  }

  return {
    exportCandleDataToCSV,
    exportAssetsToJSON,
    exportFullDataset,
    exportToCSV
  }
}
