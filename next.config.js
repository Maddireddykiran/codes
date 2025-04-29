/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.channelinsider.com',
      },
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
    ],
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    // Add support for path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/lib': require('path').join(__dirname, 'lib'),
      '@/services': require('path').join(__dirname, 'services'),
      '@': require('path').join(__dirname),
    };
    
    return config;
  },
}

module.exports = nextConfig 
