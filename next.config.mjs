/** @type {import('next').NextConfig} */
const nextConfig = {  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      // Add your CDN domain here if you migrate uploads to S3/Cloudinary
    ],
    // Local uploads served from /public are always allowed
  },
  allowedDevOrigins: ['10.5.48.54'],
};

export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   images: {
//     domains: ['cdn.shopify.com'],
//   },
//   allowedDevOrigins: ['10.5.48.54'],
// };

// export default nextConfig;
