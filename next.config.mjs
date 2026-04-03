/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Unngår dev-feil: "SegmentViewNode ... not in the React Client Manifest"
  // (kjent Next 15.x / devtools-bundler-issue; segmentutforsker er ikke nødvendig for app-utvikling)
  experimental: {
    devtoolSegmentExplorer: false,
    // Mindre / mer stabile Lucide-chunks (hjelper mot rare HMR/RSC-feil i dev)
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
