/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // If your app is in "src", tell Next.js explicitly
  distDir: '.next',
};

module.exports = nextConfig;
