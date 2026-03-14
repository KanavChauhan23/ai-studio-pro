/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.pollinations.ai', 'replicate.delivery'],
    unoptimized: true,
  },
};
module.exports = nextConfig;
