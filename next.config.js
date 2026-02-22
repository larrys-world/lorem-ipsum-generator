/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/lorem-ipsum-generator',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig