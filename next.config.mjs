/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ordinalsbot-prod.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
