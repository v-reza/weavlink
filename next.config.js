/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_API: "https://api.weavlink.works/api",
    NEXT_APP_API_IMAGES : "https://api.weavlink.works/images/"
  }
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? nextConfig
    : withPWA(nextConfig);
