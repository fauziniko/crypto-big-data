# 🚀 CryptoStream - Real-time Crypto Market Analysis Platform

> **Big Data Project** - Cryptocurrency market analysis platform dengan visualisasi real-time dan ekspor data untuk analisis Big Data.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Dokumentasi](#dokumentasi)
- [Screenshot](#screenshot)

## 🎯 Tentang Proyek

CryptoStream adalah platform analisis pasar cryptocurrency yang dibangun sebagai **Proof of Concept (PoC)** untuk mata kuliah Big Data. Platform ini mendemonstrasikan:

- ✅ Visualisasi data real-time menggunakan **dummy data**
- ✅ Simulasi streaming data dengan update otomatis
- ✅ Grafik candlestick interaktif untuk analisis teknikal
- ✅ Export data dalam format CSV dan JSON untuk analisis Big Data
- ✅ UI profesional dengan dark mode theme

### 🎓 Tujuan Pembelajaran

1. Memahami konsep **data streaming** dan **real-time processing**
2. Implementasi **data visualization** untuk Big Data
3. Pengelolaan **state management** untuk data yang terus berubah
4. Persiapan struktur data untuk **scalability** ke production

## ✨ Fitur Utama

### � **Real-Time API Integration** 

- Data **100% real** dari API cryptocurrency
- Mendukung: **Binance** (default), **CoinGecko**, **CryptoCompare**
- Auto-refresh setiap 30 detik
- Manual refresh dengan tombol di header
- **Binance tidak memerlukan API key!** ✅

👉 **[Panduan Setup API](./API_SETUP.md)**

### 1. 📊 Tabel Harga Real-time

- Menampilkan 4 cryptocurrency: BTC, ETH, SOL, XRP
- Data **real-time dari exchange API**
- Auto-refresh setiap 30 detik
- Flash animation saat harga berubah (hijau/merah)
- Data: Harga, Volume 24h, Perubahan 24h

### 2. 📈 Grafik Candlestick Interaktif

- **60+ data points** historis dari API
- Data OHLC (Open, High, Low, Close) real dari exchange
- Fitur zoom, pan, dan tooltip
- Update otomatis saat refresh

### 3. 💾 Export Data

**CSV Export:**
- Format: `timestamp, datetime, open, high, low, close, volume`
- Siap untuk Pandas, Excel, atau database
- 50+ data points historis

**JSON Export:**
- Live snapshot semua cryptocurrency
- Metadata lengkap dengan timestamp
- Format API-ready untuk integrasi

### 4. 🔄 Auto-Refresh & Manual Control

- Auto-refresh setiap 30 detik
- Manual refresh button di header
- Status indicator (Live API)
- Widget statistik (Total Assets, Data Points, Last Update)

## 🛠 Teknologi

| Kategori | Stack |
|----------|-------|
| **Framework** | Nuxt 3 (Vue 3) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **Charts** | ApexCharts |
| **State** | Pinia |
| **Export** | file-saver |

## 📦 Instalasi

### Prerequisites

- Node.js 18+ atau 20+
- npm, pnpm, atau yarn

### Langkah Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd datastream-crypto
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup API (Opsional - untuk Real Data)**

```bash
# File .env sudah tersedia, edit jika ingin menggunakan Real API
# Untuk Binance (Gratis, tanpa API key):
NUXT_PUBLIC_CRYPTO_API_PROVIDER=binance

# Lihat API_SETUP.md untuk panduan lengkap
```

4. **Jalankan development server**

```bash
npm run dev
```

5. **Buka browser**

Akses: `http://localhost:3000`

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Development mode dengan hot-reload
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

### Cara Menggunakan Platform

1. **Jalankan Aplikasi**
   - Aplikasi akan otomatis load data dari API (default: Binance)
   - Auto-refresh setiap 30 detik

2. **Manual Refresh**
   - Klik tombol **"Refresh"** di header untuk update data terbaru
   - Data langsung dari exchange/API

3. **Lihat Data Real-time**
   - Tabel menampilkan harga real dari exchange
   - Grafik candlestick dengan data historis real
   - All data 100% authentic dari API

4. **Export Data**
   - Scroll ke bagian **"Export Data"**
   - Klik **"Download CSV"** untuk data historis
   - Klik **"Download JSON"** untuk snapshot current state

5. **Analisis Grafik**
   - Gunakan scroll mouse untuk zoom
   - Drag untuk pan
   - Hover untuk tooltip detail

## 📁 Struktur Proyek

```
datastream-crypto/
├── app/
│   ├── components/              # Vue components
│   │   ├── Header.vue          # Navigation & controls
│   │   ├── CryptoTickerTable.vue  # Price table
│   │   ├── CandlestickChart.vue   # Chart visualization
│   │   ├── StatusWidget.vue    # Status cards
│   │   └── ExportPanel.vue     # Export controls
│   │
│   ├── composables/            # Reusable logic
│   │   ├── useCryptoData.ts   # Data management
│   │   └── useDataExport.ts   # Export functionality
│   │
│   ├── services/               # API services (NEW!)
│   │   └── cryptoApi.ts       # Real crypto API integration
│   │
│   ├── stores/                 # Pinia stores
│   │   └── crypto.ts          # Global state
│   │
│   ├── types/                  # TypeScript types
│   │   └── crypto.ts          # Data interfaces
│   │
│   ├── utils/                  # Utility functions
│   │   └── formatters.ts      # Number formatting
│   │
│   ├── pages/                  # Route pages
│   │   └── index.vue          # Main dashboard
│   │
│   ├── plugins/                # Nuxt plugins
│   │   └── apexcharts.client.ts  # ApexCharts setup
│   │
│   └── app.vue                 # Root component
│
├── assets/
│   └── css/
│       └── main.css           # Global styles
│
├── public/                     # Static assets
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.ts         # Tailwind configuration
├── SPESIFIKASI_TEKNIS.md      # Technical specification
└── README.md                   # This file
```

## 📚 Dokumentasi

### File Penting

1. **`SPESIFIKASI_TEKNIS.md`** - Dokumentasi lengkap:
   - Arsitektur sistem
   - Spesifikasi data
   - Desain UI/UX
   - Timeline development

2. **`app/types/crypto.ts`** - Interface TypeScript:
   ```typescript
   interface CryptoAsset {
     symbol: string
     name: string
     price: number
     volume24h: number
     change24h: number
     lastUpdate: Date
   }
   ```

3. **`app/stores/crypto.ts`** - State management:
   - `assets[]` - Array cryptocurrency
   - `candleData[]` - Historical candles
   - `isSimulating` - Simulation status
   - Actions: `startRealTimeSimulation()`, `updatePrices()`, dll.

### Key Concepts

#### 1. Simulasi Real-time

```typescript
// Update prices every 5 seconds
setInterval(() => {
  updatePrices()
}, 5000)

// Add new candle every 10 seconds
setInterval(() => {
  addNewCandle()
}, 10000)
```

#### 2. Data Generator

```typescript
// Generate 60 candles dengan volatilitas ±3%
const candles = generateCandleData(basePrice, 60, 5)
```

#### 3. Export Functionality

```typescript
// Export ke CSV
exportCandleDataToCSV(candleData)

// Export ke JSON
exportAssetsToJSON(assets)
```

## 📸 Screenshot

### Dashboard Utama
- Header dengan kontrolsimulation
- Tabel harga dengan live updates
- Grafik candlestick interaktif
- Panel export data

### Fitur Unggulan
- ✅ Dark mode professional theme
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Real-time indicators

## 🔮 Future Development

### Phase 2: Live API Integration

- [ ] Integrasi Binance WebSocket
- [ ] CoinGecko API untuk historical data
- [ ] Real-time price alerts
- [ ] Multiple timeframes (1m, 5m, 1h, 1d)

### Phase 3: Advanced Analytics

- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] Volume analysis
- [ ] Price prediction dengan ML
- [ ] Portfolio tracking

### Phase 4: Big Data Infrastructure

- [ ] Apache Kafka untuk streaming
- [ ] Spark untuk batch processing
- [ ] TimescaleDB untuk time-series data
- [ ] Data warehouse integration

## 🤝 Contributing

Proyek ini dibuat untuk tujuan pendidikan. Untuk berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Proyek ini dibuat untuk keperluan akademik - Big Data Course.

## 👥 Author

**Muhamad A. Fadillah**  
Big Data Project - Cryptocurrency Analysis Platform

## 📞 Support

Jika ada pertanyaan atau issue:

1. Baca `SPESIFIKASI_TEKNIS.md` untuk detail teknis
2. Check kode di folder `app/` untuk implementasi
3. Lihat console browser untuk debug logs

---

**Happy Coding! 🚀**

*Built with ❤️ using Nuxt 3, Vue 3, and TypeScript*
#   c r y p t o - d a t a s t r e a m  
 