/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  // basepath: !debug ? "/deepchem.github.io" : "",
  assetPrefix: !debug ? "/deepchem.github.io/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
