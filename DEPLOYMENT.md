# 🚀 Deployment Guide - Coolify

## Prerequisites

- Node.js 20.19.0 or higher
- Coolify instance configured
- GitHub repository connected to Coolify

## Quick Start

### 1. Environment Variables

Set these in Coolify Dashboard → Settings → Environment Variables:

```bash
NUXT_PUBLIC_CRYPTO_API_PROVIDER=binance
NUXT_PUBLIC_COINGECKO_API_KEY=
NUXT_PUBLIC_BINANCE_API_KEY=
NUXT_PUBLIC_BINANCE_API_SECRET=
NUXT_PUBLIC_CRYPTOCOMPARE_API_KEY=
```

### 2. Build Configuration

The following files are already configured:

- ✅ `.node-version` - Specifies Node.js 20.19.0
- ✅ `nixpacks.toml` - Build configuration for Nixpacks
- ✅ `.npmrc` - NPM configuration
- ✅ `Dockerfile` - Alternative Docker build (optional)
- ✅ `package.json` - Engine requirements added

### 3. Deploy

#### Option A: Using Nixpacks (Recommended)
1. Push code to GitHub
2. Coolify will automatically detect `nixpacks.toml`
3. Build will use Node.js 20.x
4. Application will start on port 3000

#### Option B: Using Dockerfile
1. In Coolify Dashboard → Settings
2. Select "Use Dockerfile"
3. Build will use custom Dockerfile
4. Application will start on port 3000

### 4. Verify Deployment

Check the following:
- ✅ Build completes without errors
- ✅ Server starts on port 3000
- ✅ API connections work (Binance by default)
- ✅ No console errors in browser

## Troubleshooting

### Issue: Node.js version error
**Solution**: Ensure `.node-version` file exists with `20.19.0`

### Issue: Native binding error (oxc-parser)
**Solution**: Use `nixpacks.toml` with `--legacy-peer-deps` flag

### Issue: Build cache issues
**Solution**: Clear build cache in Coolify → Settings → Build Cache

### Issue: Environment variables not loading
**Solution**: 
1. Check Coolify environment variables are set correctly
2. Restart deployment after adding env vars

## Manual Build Test (Local)

Test the production build locally before deploying:

```bash
# Clean install
rm -rf node_modules package-lock.json .nuxt .output
npm install --legacy-peer-deps

# Build
npm run build

# Test production server
node .output/server/index.mjs
```

Visit: http://localhost:3000

## Production URLs

After successful deployment, your app will be available at:
- Coolify domain: `https://your-app.coolify.domain`
- Custom domain: Configure in Coolify settings

## API Limits (Binance - Default)

- No API key required
- Rate limit: 1200 requests/minute
- Public market data only

## Support

If deployment fails:
1. Check build logs in Coolify
2. Verify Node.js version is 20.19.0
3. Ensure all environment variables are set
4. Try clearing build cache
5. Check GitHub repository connection

## Files Overview

```
.node-version          # Node.js version specification
nixpacks.toml         # Nixpacks build configuration
.npmrc                # NPM configuration
Dockerfile            # Alternative Docker build
package.json          # Dependencies & engine requirements
nuxt.config.ts        # Nuxt production configuration
.env.example          # Environment variables template
```

## Next Steps

After successful deployment:
- [ ] Monitor application logs
- [ ] Set up custom domain
- [ ] Configure SSL certificate (auto with Coolify)
- [ ] Add monitoring/analytics
- [ ] Set up backup strategy

---

**Last Updated**: October 4, 2025
**Tested On**: Coolify v4.x with Nixpacks
