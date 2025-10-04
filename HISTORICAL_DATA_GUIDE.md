# Historical Data Feature Guide

## 📖 Overview

Fitur Historical Data memungkinkan Anda untuk menganalisis pergerakan harga cryptocurrency pada periode waktu tertentu dengan berbagai interval.

## 🎯 Fitur Utama

### 1. Date Range Selection
- **Custom Date Range**: Pilih tanggal dan waktu mulai dan akhir secara manual
- **Quick Presets**: Tombol cepat untuk periode populer:
  - Last 1 Hour (interval 1m)
  - Last 6 Hours (interval 5m)
  - Last 24 Hours (interval 15m)
  - Last 7 Days (interval 1h)
  - Last 30 Days (interval 4h)

### 2. Interval Options
Pilih interval waktu untuk setiap data point:
- `1m` - 1 Menit (maksimal ~16 jam data)
- `5m` - 5 Menit (maksimal ~3.5 hari data)
- `15m` - 15 Menit (maksimal ~10 hari data)
- `30m` - 30 Menit (maksimal ~20 hari data)
- `1h` - 1 Jam (maksimal ~40 hari data)
- `4h` - 4 Jam (maksimal ~166 hari data)
- `1d` - 1 Hari (maksimal ~2.7 tahun data)
- `1w` - 1 Minggu (maksimal ~19 tahun data)

**Note**: Binance API memiliki limit maksimal 1000 data points per request.

### 3. Interactive Chart
- **Chart Types**:
  - Candlestick: Visualisasi OHLC (Open, High, Low, Close)
  - Line: Garis harga close
  - Area: Area chart dengan gradient
- **Zoom & Pan**: Perbesar dan geser chart untuk detail lebih lanjut
- **Toolbar**: Download chart sebagai gambar, reset zoom, dll.

### 4. Data Table
- **Paginated View**: Menampilkan 50 data per halaman
- **Detailed Information**:
  - Timestamp (tanggal dan waktu)
  - Open, High, Low, Close prices
  - Price change percentage
  - Volume
- **Color Coding**:
  - 🟢 Green: Harga naik (Close > Open)
  - 🔴 Red: Harga turun (Close < Open)

### 5. Statistics Summary
Ringkasan statistik untuk periode yang dipilih:
- **Highest Price**: Harga tertinggi dalam periode
- **Lowest Price**: Harga terendah dalam periode
- **Average Price**: Harga rata-rata
- **Total Change**: Perubahan harga dari awal ke akhir periode (%)

### 6. Export Data
- **Format**: CSV (Comma-Separated Values)
- **Include**: Timestamp, Date, Time, OHLC prices, Change %, Volume
- **Filename**: `{SYMBOL}_historical_{DATE}.csv`
- **Compatible with**: Excel, Google Sheets, data analysis tools

## 📝 Cara Penggunaan

### Langkah 1: Pilih Cryptocurrency
1. Buka halaman **Data Stream**
2. Pilih cryptocurrency yang ingin dianalisis (BTC, ETH, SOL, atau XRP)

### Langkah 2: Buka Tab Historical Data
1. Klik tab **"Historical Data"** (di samping "Live Stream")

### Langkah 3: Pilih Period dan Interval

#### Opsi A: Menggunakan Quick Presets
1. Klik salah satu tombol preset:
   - "Last 1 Hour" untuk data 1 jam terakhir
   - "Last 24 Hours" untuk data 24 jam terakhir
   - dll.
2. Klik tombol **"Load Data"**

#### Opsi B: Custom Date Range
1. Pilih **Start Date** (tanggal dan waktu mulai)
2. Pilih **End Date** (tanggal dan waktu akhir)
3. Pilih **Interval** dari dropdown
4. Klik tombol **"Load Data"**

### Langkah 4: Analisis Data

#### Menggunakan Chart:
1. **Ubah tipe chart**: Klik button "Candlestick", "Line", atau "Area"
2. **Zoom**: 
   - Drag mouse pada area chart untuk zoom
   - Atau gunakan toolbar zoom in/out
3. **Pan**: Setelah zoom, drag chart untuk bergerak
4. **Reset**: Klik icon home di toolbar untuk reset view
5. **Download**: Klik icon download untuk save chart sebagai PNG

#### Menggunakan Table:
1. Scroll untuk melihat semua data
2. Perhatikan warna:
   - 🟢 Change positif = harga naik
   - 🔴 Change negatif = harga turun
3. Gunakan pagination (Previous/Next) untuk navigasi data

### Langkah 5: Export Data (Optional)
1. Klik tombol **"Export CSV"** di atas table
2. File CSV akan otomatis ter-download
3. Buka file dengan Excel atau Google Sheets untuk analisis lebih lanjut

### Langkah 6: Clear Data (Optional)
1. Klik tombol **"Clear Data"** untuk membersihkan data
2. Pilih parameter baru dan load data lagi

## 💡 Tips & Best Practices

### Memilih Interval yang Tepat
- **Analisis Intraday** (dalam 1 hari): Gunakan interval 1m atau 5m
- **Analisis Short-term** (beberapa hari): Gunakan interval 15m atau 30m
- **Analisis Medium-term** (minggu): Gunakan interval 1h atau 4h
- **Analisis Long-term** (bulan/tahun): Gunakan interval 1d atau 1w

### Optimasi Data Loading
- Interval lebih kecil = lebih detail tapi range waktu lebih pendek
- Interval lebih besar = range waktu lebih panjang tapi detail berkurang
- Maximum 1000 data points per request

### Analisis yang Disarankan
1. **Trend Analysis**: Gunakan Line atau Area chart untuk melihat trend jangka panjang
2. **Price Action**: Gunakan Candlestick untuk analisis detail pergerakan harga
3. **Volatility**: Lihat perbedaan High-Low dan ukuran candle
4. **Volume**: Volume tinggi = aktivitas trading besar
5. **Support/Resistance**: Identifikasi level harga yang sering tersentuh

## 🔍 Contoh Use Cases

### Use Case 1: Analisis Volatilitas 24 Jam
```
1. Pilih cryptocurrency: BTC/USD
2. Klik preset: "Last 24 Hours"
3. Load Data
4. Lihat statistik: Highest vs Lowest price
5. Perhatikan candle dengan range besar = high volatility
```

### Use Case 2: Mencari Entry Point
```
1. Pilih cryptocurrency: ETH/USD
2. Custom range: Last 7 days, interval 1h
3. Load Data
4. Ubah chart ke Candlestick
5. Identifikasi support level (harga terendah berulang)
6. Tunggu harga mendekati support untuk entry
```

### Use Case 3: Export untuk Backtesting
```
1. Pilih cryptocurrency dan periode
2. Load Data
3. Export CSV
4. Import ke Python/Excel untuk backtesting strategy
```

### Use Case 4: Compare Performance
```
1. Load historical data untuk BTC (7 hari)
2. Catat Total Change
3. Ganti ke ETH, load data periode sama
4. Compare Total Change untuk lihat mana yang perform lebih baik
```

## ⚠️ Limitations

1. **Binance API Limit**: Maximum 1000 data points per request
2. **Historical Depth**: 
   - Binance menyimpan data berbeda untuk setiap interval
   - Interval kecil (1m) hanya tersedia beberapa hari kebelakang
3. **Rate Limiting**: Terlalu banyak request dalam waktu singkat bisa di-rate limit
4. **Data Availability**: Data historical tergantung availability dari Binance

## 🐛 Troubleshooting

### "Failed to load historical data"
- **Penyebab**: Koneksi internet, Binance API down, atau invalid parameters
- **Solusi**: 
  - Check koneksi internet
  - Coba lagi beberapa saat
  - Pilih range waktu yang lebih kecil

### "No Data Available"
- **Penyebab**: Interval terlalu kecil untuk range yang besar, atau data tidak tersedia
- **Solusi**:
  - Gunakan interval yang lebih besar
  - Pilih range waktu yang lebih pendek
  - Cek apakah cryptocurrency tersebut valid

### Chart tidak muncul
- **Penyebab**: Data belum di-load atau error loading
- **Solusi**:
  - Pastikan sudah klik "Load Data"
  - Check browser console untuk error
  - Refresh halaman

## 📚 Additional Resources

- [Binance API Documentation](https://binance-docs.github.io/apidocs/spot/en/)
- [Candlestick Chart Patterns](https://www.investopedia.com/trading/candlestick-charting-what-is-it/)
- [Technical Analysis Basics](https://www.investopedia.com/terms/t/technicalanalysis.asp)

## 🎓 Learning Path

1. **Beginner**: Mulai dengan quick presets dan perhatikan price movement
2. **Intermediate**: Custom date ranges, analyze patterns, export data
3. **Advanced**: Combine dengan technical indicators, backtesting strategies

---

Happy Analyzing! 📊📈🚀
