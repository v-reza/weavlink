/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_SOCKET: "https://weav-socket.fly.dev",
    // NEXT_APP_API: "https://api-weav.fly.dev/api",
    NEXT_APP_API_IMAGES : "https://api-weav.fly.dev/images/",
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
