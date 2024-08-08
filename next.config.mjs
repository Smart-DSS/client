/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["lh3.googleusercontent.com"]
    },
    webpack: config => {
        config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, tls:false};
        return config;
      },
};

export default nextConfig;
