// Disable SSL certificate verification for development only
// This fixes "unable to verify the first certificate" errors on Windows
// WARNING: Do not use in production!

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  console.log('⚠️  SSL certificate verification disabled for development')
}

export default defineNitroPlugin((nitroApp) => {
  // Plugin initialization
})
