/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_SOCKET: "https://weavsocket.herokuapp.com",
    NEXT_APP_API: "https://api-weavlink-production.up.railway.app/api",
    NEXT_APP_API_IMAGES : "https://api-weavlink-production.up.railway.app/images/",
    // CI: false,
    // GENERATE_SOURCEMAP: false
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
