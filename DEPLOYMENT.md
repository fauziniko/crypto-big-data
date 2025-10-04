# Deployment Guide - Cloudflare Pages

## 📋 Prerequisites

- Cloudflare account
- GitHub repository connected to Cloudflare Pages

## 🚀 Deployment Steps

### 1. Connect Repository to Cloudflare Pages

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**
3. Select your GitHub repository: `aliffadillah/crypto-datastream`
4. Click **Begin setup**

### 2. Build Configuration

Set the following configuration in Cloudflare Pages:

#### Framework preset
```
Nuxt.js
```

#### Build command
```bash
npm run build
```

#### Build output directory
```
dist
```

#### Root directory (optional)
```
/
```

### 3. Environment Variables

Add these environment variables in Cloudflare Pages settings:

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_VERSION` | `20.19.0` | ✅ Yes |
| `NODE_ENV` | `production` | ✅ Yes |
| `NUXT_PUBLIC_API_URL` | `https://crypto.aliffadillah.my.id` | Optional |

**Note**: Binance API tidak memerlukan API key untuk public data.

### 4. Deploy

1. Click **Save and Deploy**
2. Wait for build to complete (~2-5 minutes)
3. Your site will be available at: `https://[project-name].pages.dev`

### 5. Custom Domain (Optional)

1. Go to your project settings → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `crypto.aliffadillah.my.id`
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning (~5-10 minutes)

## 🔧 Build Settings Summary

```yaml
Framework: Nuxt.js
Build command: npm run build
Build output directory: dist
Node version: 20.19.0
Preset: cloudflare-pages
```

## 🐛 Troubleshooting

### "Output directory not found"
- **Cause**: Build configuration incorrect
- **Solution**: Make sure preset is set to `cloudflare-pages` in `nuxt.config.ts`

### "Build failed with TypeScript errors"
- **Cause**: Path with spaces in local development
- **Solution**: TypeCheck is disabled for production builds

### "API calls failing"
- **Cause**: CORS or SSL issues
- **Solution**: Check Binance API is accessible, SSL verification is handled in server routes

### "Build timeout"
- **Cause**: Large dependencies
- **Solution**: Dependencies are already optimized with manual chunks

## 📊 Expected Build Output

```
✔ Nitro built in XXX ms
ℹ Building client...
✔ Client built in XXX ms
✔ You can now deploy `.output/public` to any static hosting!
```

## 🔄 Continuous Deployment

Every push to `main` branch will automatically trigger a new deployment.

To deploy manually:
1. Go to Cloudflare Pages dashboard
2. Click **Create deployment**
3. Select branch to deploy
4. Click **Deploy**

## 📝 Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] Cryptocurrency data displays correctly
- [ ] Live stream works
- [ ] Historical data loads
- [ ] Export CSV functions
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

## 🌐 Production URL

Once deployed, your application will be available at:
- **Cloudflare URL**: `https://[project-name].pages.dev`
- **Custom Domain**: `https://crypto.aliffadillah.my.id`

## 🎉 Success!

Your Crypto DataStream application is now live on Cloudflare Pages with:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ Edge computing
- ✅ Unlimited bandwidth
- ✅ Free hosting

---

Need help? Check the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
