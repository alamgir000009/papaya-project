/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's strict mode
  images: {
    domains: ["127.0.0.1"], // Add the hostname(s) for your external images
  },
};

export default nextConfig;
