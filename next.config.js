/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  /*typescript: {
    ignoreBuildErrors: true // Temporal si persisten errores de tipos
  }*/
};

module.exports = nextConfig;

