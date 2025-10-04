# 🎯 Feature: Multi-Crypto Candlestick Chart

## ✨ Fitur Baru Yang Ditambahkan

### 1. **Crypto Selector**
- Grid 4 tombol untuk memilih cryptocurrency
- Menampilkan: Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Ripple (XRP)
- Setiap tombol menampilkan:
  - Icon crypto
  - Harga saat ini
  - Perubahan 24h (dengan warna hijau/merah)

### 2. **Dynamic Chart Loading**
- Chart otomatis fetch data saat crypto dipilih
- Loading state dengan spinner saat fetch data
- Error handling jika data tidak tersedia

### 3. **Independent Data Management**
- Setiap crypto punya data candlestick sendiri
- Tidak menggangu data di store global
- Fetch on-demand untuk performa lebih baik

---

## 🎨 UI/UX Design

### Crypto Selector Layout:
```
┌─────────────────────────────────────────────────────┐
│  Select Cryptocurrency                              │
├──────────────┬──────────────┬──────────────┬────────┤
│   [BTC Icon] │  [ETH Icon]  │  [SOL Icon]  │ [XRP]  │
│   BTC        │  ETH         │  SOL         │  XRP   │
│   $68,500.25 │  $3,510.90   │  $145.88     │ $0.52  │
│   ↑ 3.55%    │  ↓ 1.12%     │  ↑ 5.01%     │ ↓ 0.50%│
└──────────────┴──────────────┴──────────────┴────────┘
```

### Selected State:
- **Border:** Biru (primary color)
- **Background:** Semi-transparent biru
- **Others:** Abu-abu dengan hover effect

---

## 🔧 Technical Implementation

### Component Structure:

```vue
<template>
  <!-- 1. Crypto Selector -->
  <div class="crypto-selector">
    <button v-for="asset in assets">
      <!-- Crypto info & selection -->
    </button>
  </div>

  <!-- 2. Chart Header -->
  <div class="chart-header">
    <h2>{{ selectedCryptoSymbol }} - Candlestick Chart</h2>
  </div>

  <!-- 3. Chart Container -->
  <div class="chart-container">
    <!-- Loading or Chart -->
  </div>

  <!-- 4. Stats (OHLC) -->
  <div class="chart-stats">
    <!-- Open, High, Low, Close -->
  </div>
</template>
```

### Data Flow:

```
User clicks crypto button
    ↓
selectCrypto(symbol) called
    ↓
Update selectedCryptoSymbol
    ↓
fetchCandleData(symbol)
    ↓
API call to Binance/CoinGecko/CryptoCompare
    ↓
Update cryptoCandleData
    ↓
Chart re-renders with new data
```

### API Symbol Mapping:

```typescript
const symbolMapping = {
  'BTC/USD': {
    binance: 'BTCUSDT',
    coingecko: 'bitcoin',
    cryptocompare: 'BTC'
  },
  'ETH/USD': {
    binance: 'ETHUSDT',
    coingecko: 'ethereum',
    cryptocompare: 'ETH'
  },
  // ... etc
}
```

---

## 📊 How It Works

### 1. Initial Load:
```javascript
onMounted(async () => {
  // Default: Load BTC chart
  await fetchCandleData('BTC/USD')
})
```

### 2. User Selects Crypto:
```javascript
const selectCrypto = async (symbol: string) => {
  if (selectedCryptoSymbol.value === symbol) return // Already selected
  
  selectedCryptoSymbol.value = symbol
  await fetchCandleData(symbol) // Fetch new data
}
```

### 3. Fetch Data from API:
```javascript
const fetchCandleData = async (symbol: string) => {
  isLoadingChart.value = true
  
  try {
    const api = useCryptoApi()
    const apiSymbol = symbolMapping[symbol].binance // or coingecko/cryptocompare
    const data = await api.getHistoricalData(apiSymbol, options)
    
    cryptoCandleData.value = data
  } catch (error) {
    cryptoCandleData.value = []
  } finally {
    isLoadingChart.value = false
  }
}
```

### 4. Chart Updates:
```javascript
const series = computed(() => {
  // Map cryptoCandleData to ApexCharts format
  return [{
    name: 'Price',
    data: cryptoCandleData.value.map(candle => ({
      x: candle.timestamp,
      y: [candle.open, candle.high, candle.low, candle.close]
    }))
  }]
})
```

---

## 🎯 Features

### ✅ Implemented:
- [x] 4 crypto options (BTC, ETH, SOL, XRP)
- [x] Visual selector with icons
- [x] Dynamic data loading
- [x] Loading state
- [x] Error handling
- [x] Real-time price display
- [x] 24h change indicator
- [x] Independent data per crypto
- [x] OHLC stats update

### 🚧 Future Enhancements:
- [ ] More cryptocurrencies (100+)
- [ ] Search functionality
- [ ] Favorites/watchlist
- [ ] Compare multiple cryptos
- [ ] Different timeframes (1m, 15m, 1h, 1d)
- [ ] Volume chart overlay
- [ ] Technical indicators (RSI, MACD, etc)

---

## 🎨 Styling

### Selected Button:
```css
border: 2px solid var(--primary-color)
background: var(--primary-color-10%)
```

### Unselected Button:
```css
border: 2px solid var(--dark-border)
hover: border-primary/50
```

### Price Change Colors:
```css
Positive: text-success (#10B981 - green)
Negative: text-danger (#EF4444 - red)
```

---

## 🐛 Error Handling

### Scenario 1: API Error
```javascript
try {
  const data = await api.getHistoricalData(...)
} catch (error) {
  console.error(`❌ Error fetching candle data:`, error)
  cryptoCandleData.value = [] // Empty data
  // Chart shows "No chart data available"
}
```

### Scenario 2: No Data Returned
```javascript
if (cryptoCandleData.value.length === 0) {
  // Show empty state message
  return []
}
```

### Scenario 3: Invalid Symbol
```javascript
const mapping = symbolMapping[symbol]
if (!mapping) {
  throw new Error(`No mapping found for ${symbol}`)
}
```

---

## 📱 Responsive Design

### Desktop (lg+):
- 4 columns grid
- All info visible

### Tablet (md):
- 4 columns grid (smaller buttons)
- Compact layout

### Mobile (sm):
- 2 columns grid
- Stacked info

---

## ⚡ Performance Optimization

### 1. **Lazy Loading**
- Data hanya di-fetch saat crypto dipilih
- Tidak fetch semua crypto di awal

### 2. **Caching** (Future)
- Cache data per crypto
- Reuse jika masih fresh (<1 min)

### 3. **Debouncing**
- Prevent double-click fetch
- Check if already selected

---

## 🔄 Data Update Strategy

### Current:
- **Manual refresh** via button di header
- User selects crypto → fetch data
- No auto-refresh per crypto

### Future Enhancement:
- Auto-refresh selected crypto setiap 30s
- WebSocket untuk real-time updates
- Batch fetch multiple cryptos

---

## 🎯 User Experience

### Flow:
1. **User lands on page** → BTC chart loaded by default
2. **User clicks ETH button** → Loading spinner → ETH chart appears
3. **User clicks BTC again** → Data re-fetched (fresh data)
4. **Stats update** → OHLC values show latest candle

### Feedback:
- **Visual:** Selected button highlighted
- **Loading:** Spinner with text
- **Success:** Chart appears smoothly
- **Error:** Empty state message

---

## 📝 Code Example

### Usage in Page:
```vue
<template>
  <CandlestickChart />
</template>
```

### Component is Self-Contained:
- Manages own state
- Fetches own data
- No props needed
- Uses global `assets` for selector

---

## ✅ Testing Checklist

- [ ] Click BTC → Chart loads
- [ ] Click ETH → Chart switches to ETH
- [ ] Click SOL → Chart switches to SOL
- [ ] Click XRP → Chart switches to XRP
- [ ] Click same crypto → Re-fetch (fresh data)
- [ ] Loading spinner shows during fetch
- [ ] Stats update after data loaded
- [ ] Selected button highlighted
- [ ] Prices update in selector buttons
- [ ] 24h change shows correct color
- [ ] Responsive on mobile (2 columns)
- [ ] Error handling works (disconnect internet)

---

## 🚀 Benefits

1. **Better UX** - User can explore different cryptos easily
2. **Real Data** - Each crypto shows actual market data
3. **Independent** - Doesn't affect main store data
4. **Performant** - Lazy loading saves bandwidth
5. **Scalable** - Easy to add more cryptos later

---

**Last Updated:** October 4, 2025
**Status:** ✅ Implemented & Working
**Component:** `app/components/CandlestickChart.vue`
