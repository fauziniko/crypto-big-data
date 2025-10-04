#!/bin/sh

# Wait for dependencies (if any)
echo "Starting CryptoStream application..."

# Set environment variables
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-3000}
export NODE_ENV=${NODE_ENV:-production}

# Start the application
echo "Starting server on $HOST:$PORT"
exec node .output/server/index.mjs
