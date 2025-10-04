# Build stage
FROM node:20.19.0-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy application files
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20.19.0-alpine

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json /app/

# Set environment to production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start application
CMD ["node", ".output/server/index.mjs"]
