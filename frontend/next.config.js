/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.pollinations.ai', 'replicate.delivery'],
    unoptimized: true,
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
    }];
  },
};
module.exports = nextConfig;
