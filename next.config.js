/** @type {import('next').NextConfig} */
const nextConfig = {
  // Telemetry is controlled by environment variable NEXT_TELEMETRY_DISABLED
  // To disable: Set NEXT_TELEMETRY_DISABLED=1 in your environment
  // Or run: npx next telemetry disable
  
  // Security: Disable X-Powered-By header
  poweredByHeader: false,
  
  // Security: Enable strict mode
  reactStrictMode: true,
  
  // Security: Compress responses
  compress: true,
  
  // Security: Production optimizations
  swcMinify: true,
  
  // Security: Headers are handled in middleware.ts
  // Additional security headers can be added here if needed
};

module.exports = nextConfig;

