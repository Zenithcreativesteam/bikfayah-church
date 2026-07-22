const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Allow Sanity studio to work
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons'],
};

module.exports = withNextIntl(nextConfig);
