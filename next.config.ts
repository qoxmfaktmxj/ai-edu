import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a stray package-lock.json higher up would otherwise be picked as the workspace root).
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  // Example sites are plain HTML folders under public/examples.
  // Next strips the trailing slash (/examples/x/ -> /examples/x), which would make ./styles.css resolve to /examples/styles.css,
  // so send folder URLs to the real index.html where relative paths stay inside the example folder.
  async redirects() {
    return [{ source: "/examples/:name", destination: "/examples/:name/index.html", permanent: false }];
  },
  async rewrites() {
    return [{ source: "/examples/:name", destination: "/examples/:name/index.html" }];
  },
};

export default nextConfig;
