/** @type {import("next").NextConfig} */
const nextConfig = {};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true
});

module.exports = withPWA(nextConfig);
