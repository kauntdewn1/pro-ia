/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
