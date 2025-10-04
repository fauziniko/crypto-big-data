# 🔧 Troubleshooting: Candlestick Chart

## 🐛 Masalah: Chart Tidak Menampilkan Data

### ✅ Perbaikan Yang Sudah Dilakukan:

1. **Fixed Timestamp Format**
   - **Sebelum:** `timestamp: new Date(candle[0])` ❌
   - **Sesudah:** `timestamp: candle[0]` ✅
   - **Alasan:** CandleData type expects `number`, not `Date` object

2. **Added Logging**
   - Store akan log detail candle data yang dimuat
   - Chart component akan log data yang diproses
   - Memudahkan debugging

3. **Type Safety**
   - Chart sekarang handle timestamp sebagai number atau Date
   - Auto-convert jika perlu

---

## 📊 Cara Mengecek Apakah Chart Berfungsi:

### 1. Open Browser Console (F12)

Setelah halaman load, Anda harus melihat log seperti ini:

```
🌐 Fetching crypto data from API...
✅ Data loaded successfully: {
  assets: 4,
  candles: 60,
  coins: "BTC/USD, ETH/USD, SOL/USD, XRP/USD",
  sampleCandle: {
    timestamp: 1728043200000,
    open: 68500.25,
    high: 68750.00,
    low: 68200.50,
    close: 68600.75,
    volume: 1250000
  }
}

📊 Candle data sample: {
  first: { timestamp: 1728043200000, ... },
  last: { timestamp: 1728046800000, ... }
}

📊 Preparing chart data: {
  totalCandles: 60,
  firstCandle: { ... },
  lastCandle: { ... }
}
```

### 2. Periksa Data di Vue DevTools

Jika Anda punya Vue DevTools:
1. Buka tab "Pinia"
2. Pilih store "crypto"
3. Check property `candleData`
4. Harus ada array dengan 60+ items

---

## 🔍 Debugging Steps:

### Step 1: Check API Response
```javascript
// Paste di browser console
fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=60')
  .then(r => r.json())
  .then(data => {
    console.log('Binance API Response:', data)
    console.log('Total candles:', data.length)
    console.log('Sample candle:', data[0])
  })
```

Expected output:
```javascript
[
  [
    1728043200000,  // Open time (timestamp)
    "68500.25",     // Open
    "68750.00",     // High
    "68200.50",     // Low
    "68600.75",     // Close
    "1250.5",       // Volume
    ...
  ],
  ...
]
```

### Step 2: Check Store State
```javascript
// Paste di browser console (after app loads)
const store = window.$nuxt.$pinia.state.value.crypto
console.log('Assets:', store.assets)
console.log('Candle Data:', store.candleData)
console.log('Total Candles:', store.candleData.length)
```

### Step 3: Check Chart Component
Jika chart masih tidak muncul:
1. Lihat di console apakah ada error dari ApexCharts
2. Check apakah `series` computed property return data
3. Check apakah ApexCharts loaded (ClientOnly component)

---

## 🐛 Common Issues & Solutions:

### Issue 1: "Loading chart data..." Terus Menerus
**Penyebab:** `candleData` masih empty atau undefined

**Solusi:**
```bash
# 1. Clear browser cache
Ctrl + Shift + R

# 2. Check console untuk error API
# 3. Pastikan internet connection aktif
# 4. Try manual refresh button
```

### Issue 2: Chart Muncul Tapi Kosong (Grid Saja)
**Penyebab:** Data format tidak sesuai dengan ApexCharts

**Solusi:** Sudah diperbaiki dengan:
- Timestamp sebagai number (milliseconds)
- OHLC values sebagai array: `[open, high, low, close]`

### Issue 3: Chart Error di Console
**Possible Errors:**
```
ApexCharts: Data missing or invalid
```

**Check:**
1. Apakah `candleData` array tidak kosong?
2. Apakah setiap candle punya semua property (timestamp, open, high, low, close)?
3. Apakah values numerik (bukan string)?

### Issue 4: Timestamp Format Salah
**Symptom:** Chart menampilkan tanggal yang aneh atau x-axis kosong

**Solution:** Sudah fixed! Timestamp sekarang dalam milliseconds (Unix timestamp)
```javascript
// Correct format
timestamp: 1728043200000  // ✅

// Wrong format (old)
timestamp: Date object    // ❌
timestamp: "2024-10-04"   // ❌
```

---

## 🔄 Restart & Refresh:

Jika masih ada masalah setelah update kode:

```bash
# 1. Stop development server
Ctrl + C

# 2. Clear Nuxt cache
Remove-Item -Recurse -Force .nuxt

# 3. Restart server
npm run dev

# 4. Hard refresh browser
Ctrl + Shift + R
```

---

## ✅ Expected Result:

Setelah perbaikan, Anda harus melihat:

1. **Loading State** (1-2 detik)
   - Spinner dengan teks "Loading cryptocurrency data..."

2. **Chart Muncul**
   - Candlestick chart dengan 60 bars
   - Green untuk up (close > open)
   - Red untuk down (close < open)
   - X-axis: Time (HH:mm format)
   - Y-axis: Price in USD

3. **Stats Di Bawah Chart**
   - Open, High, Low, Close values
   - All should show real Bitcoin prices

4. **Interactive Features**
   - Zoom in/out with mouse scroll
   - Pan by dragging
   - Hover for tooltip
   - Toolbar buttons work

---

## 📝 Code Changes Summary:

### File: `app/services/cryptoApi.ts`
```typescript
// Binance
timestamp: candle[0]  // Keep as number ✅

// CoinGecko
timestamp: candle[0]  // Keep as number ✅

// CryptoCompare
timestamp: candle.time * 1000  // Convert seconds to ms ✅
```

### File: `app/components/CandlestickChart.vue`
```typescript
// Handle both number and Date
const timestamp = typeof candle.timestamp === 'number' 
  ? candle.timestamp 
  : new Date(candle.timestamp).getTime()
```

### File: `app/stores/crypto.ts`
```typescript
// Added detailed logging
console.log('📊 Candle data sample:', {
  first: this.candleData[0],
  last: this.candleData[this.candleData.length - 1]
})
```

---

## 🎯 Test Checklist:

- [ ] Browser console shows "✅ Data loaded successfully"
- [ ] Console shows candle count (should be ~60)
- [ ] Console shows sample candle with all OHLC values
- [ ] Chart component shows "📊 Preparing chart data" log
- [ ] Chart renders with green/red candlesticks
- [ ] X-axis shows time labels
- [ ] Y-axis shows price labels
- [ ] Hover shows tooltip with OHLC data
- [ ] Zoom in/out works
- [ ] Stats below chart show real values

---

## 📞 Still Not Working?

1. **Check browser console** for errors
2. **Check Network tab** - is Binance API call successful?
3. **Try different browser** (Chrome/Edge)
4. **Clear all cache** and restart
5. **Check `.env` file** - ensure provider is 'binance'

---

**Last Updated:** October 4, 2025
**Status:** ✅ Fixed - Timestamp format corrected
