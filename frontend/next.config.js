/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.pollinations.ai', 'replicate.delivery'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Allow images from Pollinations + data URIs + self
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://image.pollinations.ai https://replicate.delivery https://*.replicate.delivery",
              "connect-src 'self' https://image.pollinations.ai",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
