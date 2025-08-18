// next.config.js or next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",  // Or specify exact hostnames
        pathname: "/**"
      }
    ]
  }
}
export default nextConfig;
