
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent bundling of 'async_hooks' on the client side.
      // This module is Node.js specific and not available in the browser.
      // OpenTelemetry (used by Genkit) might indirectly try to import it.
      
      // Ensure config.resolve object exists
      config.resolve = config.resolve || {};
      // Ensure config.resolve.fallback object exists
      config.resolve.fallback = config.resolve.fallback || {};
      // Set async_hooks to false
      config.resolve.fallback.async_hooks = false;
    }
    return config;
  },
};

export default nextConfig;
