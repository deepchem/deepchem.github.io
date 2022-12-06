/** @type {import('next').NextConfig} */


const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  assetPrefix: !debug ? "https://yukino2002.github.io/deepchem.github.io/" : "",

  
};

module.exports = nextConfig;
