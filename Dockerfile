# Simple Dockerfile untuk Coolify
# Optimized untuk deployment yang cepat dan reliable

FROM node:20-alpine

WORKDIR /app

# Install curl untuk health check
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies dengan production flag
RUN npm ci --omit=dev --legacy-peer-deps

# Copy seluruh aplikasi
COPY . .

# Build aplikasi
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Start
CMD ["node", ".output/server/index.mjs"]
