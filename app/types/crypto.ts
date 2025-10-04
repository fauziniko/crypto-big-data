/**
 * Type definitions for Cryptocurrency Data
 */

export interface CryptoAsset {
  symbol: string;           // e.g., "BTC/USD"
  name: string;             // e.g., "Bitcoin"
  price: number;            // Current price in USD
  volume24h: number;        // 24-hour volume in USD
  change24h: number;        // Percentage change (e.g., 3.55 for +3.55%)
  high24h?: number;         // 24-hour high price
  low24h?: number;          // 24-hour low price
  lastUpdate: Date;         // Last update timestamp
  previousPrice?: number;   // For animation tracking
}

export interface CandleData {
  timestamp: number;        // Unix timestamp in milliseconds
  open: number;             // Opening price
  high: number;             // Highest price in the period
  low: number;              // Lowest price in the period
  close: number;            // Closing price
  volume?: number;          // Trading volume (optional)
}

export interface ExportData {
  exportTime: string;
  assets: CryptoAsset[];
}

export interface ChartOptions {
  symbol: string;
  interval: '5m' | '1h' | '1d';
  dataPoints: number;
}

export type PriceDirection = 'up' | 'down' | 'neutral';
