import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a stray package-lock.json higher up would otherwise be picked as the workspace root).
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  // Example sites are plain HTML folders under public/examples; serve their index.html at the folder URL.
  async rewrites() {
    return [{ source: "/examples/:name", destination: "/examples/:name/index.html" }];
  },
};

export default nextConfig;
