/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  images: {
    domains: [
      'bellapassi.engineers2.com',
      'cdn.yoursite.com',
      'bellapassi.vercel.app',
    ],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'bellapassi.admin.engineers2.com',
        pathname: '/storage/**',
      },
    ],
  },
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
