/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    HOSTING_NAME: process.env.HOSTING_NAME,
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  },
});

module.exports = nextConfig;
