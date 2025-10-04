# 🔧 Troubleshooting - Degraded Status

## Status "Degraded (unhealthy)" di Coolify

### Penyebab Umum:

1. **Health check gagal** - Container tidak merespons pada port yang benar
2. **Port binding salah** - Aplikasi tidak bind ke `0.0.0.0`
3. **Environment variables tidak set**
4. **Build berhasil tapi server crash saat start**

---

## ✅ Solusi Step-by-Step

### 1. Cek Port Configuration di Coolify

Di Coolify Dashboard → Configuration → General:

- **Port**: `3000` (default Nuxt)
- **Health Check Path**: `/` atau `/api/health`

### 2. Cek Environment Variables

Pastikan di Coolify → Environment Variables:

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
NUXT_PUBLIC_CRYPTO_API_PROVIDER=binance
```

### 3. Cek Logs di Coolify

Buka: **Deployments → Logs** untuk melihat error:

**Logs yang Normal:**
```
Starting CryptoStream application...
Starting server on 0.0.0.0:3000
Nitro server started on http://[::]:3000
```

**Error yang Mungkin:**
```
Error: listen EADDRINUSE: address already in use :::3000
→ Solusi: Port sudah digunakan, restart container

Error: Cannot find module
→ Solusi: Rebuild dengan clear cache

Health check failed
→ Solusi: Cek port configuration
```

### 4. Test Health Check Manual

Di Coolify → Terminal, jalankan:

```bash
# Cek apakah aplikasi listening
netstat -tlnp | grep 3000

# Test HTTP request
curl http://localhost:3000

# Cek process
ps aux | grep node
```

### 5. Rebuild dengan Clear Cache

Di Coolify:
1. Stop application
2. **Advanced → Disable Build Cache** (centang)
3. **Redeploy**
4. Setelah sukses, uncheck disable build cache

---

## 🐛 Debug Checklist

- [ ] Port 3000 di expose di Dockerfile? ✅
- [ ] Health check ada di Dockerfile? ✅
- [ ] ENV `HOST=0.0.0.0` dan `PORT=3000` set? ✅
- [ ] Logs menunjukkan "server started"?
- [ ] Health check path `/` bisa diakses?
- [ ] Container status "running" di Docker?

---

## 🔍 Cek Build Success

Pastikan build berhasil dengan melihat:

```
✔ Vite client built in XXms
✔ Vite server built in XXms
✔ Nuxt Nitro server built in XXXXms
```

Jika ada error di build, perbaiki dulu sebelum deploy.

---

## 🚀 Force Restart

Jika masih degraded setelah semua diatas:

1. **Stop** application
2. **Clear build cache**
3. **Delete container** (optional)
4. **Redeploy** from scratch

---

## 📋 Health Check Configuration

### Option 1: Default Health Check (Recommended)

Coolify akan otomatis cek port 3000.

### Option 2: Custom Health Check Endpoint

Buat file `app/server/api/health.get.ts`:

```typescript
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }
})
```

Lalu set di Coolify:
- **Health Check Path**: `/api/health`

---

## 🔄 Alternative: Use Docker Compose

Jika masih bermasalah, gunakan docker-compose:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - HOST=0.0.0.0
      - PORT=3000
      - NUXT_PUBLIC_CRYPTO_API_PROVIDER=binance
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
```

---

## 📞 Masih Error?

1. Screenshot logs dari Coolify
2. Screenshot configuration (port, env vars)
3. Test build locally:
   ```bash
   docker build -t crypto-test .
   docker run -p 3000:3000 -e HOST=0.0.0.0 crypto-test
   ```
4. Akses http://localhost:3000

Jika local berhasil tapi Coolify gagal, kemungkinan masalah di konfigurasi Coolify.

---

**Last Updated**: October 4, 2025
