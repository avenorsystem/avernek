/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emit only the files required by the production server. This keeps the
  // Docker runtime image much smaller than copying node_modules wholesale.
  output: "standalone",
};

export default nextConfig;
