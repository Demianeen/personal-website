import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/talks/why-ts/:path*',
        destination: '/talks/why-ts/index.html',
      },
    ];
  },
};

export default nextConfig;
