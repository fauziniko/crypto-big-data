/**
 * Utility functions for formatting numbers and prices
 */

/**
 * Format price with appropriate decimals
 */
export function formatPrice(price: number, decimals: number = 2): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Format price with currency symbol
 */
export function formatCurrency(price: number, decimals: number = 2): string {
  return `$${formatPrice(price, decimals)}`
}

/**
 * Format large numbers (K, M, B)
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }
  return `$${value.toFixed(2)}`
}

/**
 * Format percentage with sign
 */
export function formatPercentage(value: number, includeSign: boolean = true): string {
  const formatted = value.toFixed(2)
  if (includeSign && value > 0) {
    return `+${formatted}%`
  }
  return `${formatted}%`
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format time ago (e.g., "5s ago", "2m ago")
 */
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  
  if (seconds < 60) {
    return `${seconds}s ago`
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`
  } else if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`
  }
  return `${Math.floor(seconds / 86400)}d ago`
}

/**
 * Get color class based on value
 */
export function getPriceColorClass(value: number): string {
  if (value > 0) return 'text-primary'
  if (value < 0) return 'text-danger'
  return 'text-dark-text-secondary'
}

/**
 * Get arrow indicator for price direction
 */
export function getPriceArrow(value: number): string {
  if (value > 0) return '↑'
  if (value < 0) return '↓'
  return '→'
}
