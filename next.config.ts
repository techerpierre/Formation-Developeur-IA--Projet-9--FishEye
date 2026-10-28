import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    allowedDevOrigins: ['192.168.1.19'],
}

export default nextConfig
