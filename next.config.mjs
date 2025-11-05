/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@tanstack/react-query",
      "@total-typescript/ts-reset"
    ]
  }
};

export default nextConfig;
