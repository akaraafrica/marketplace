/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ak-marketplace.s3.eu-west-3.amazonaws.com"],
  },
};

const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()(nextConfig);
