/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOSTING_NAME: process.env.HOSTING_NAME,
  },
};

module.exports = nextConfig;
