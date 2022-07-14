/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { withSuperjson } = require('next-superjson');
module.exports = withSuperjson()(nextConfig);
