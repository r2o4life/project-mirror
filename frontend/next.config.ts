import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Note: if deploying to https://[username].github.io/[repo-name]/, you must uncomment and set basePath:
  // basePath: '/[repo-name]',
};

export default nextConfig;
