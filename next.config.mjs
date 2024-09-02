
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Exclude `sshcrypto.node` from client-side bundling
    config.module.rules.push({
      test: /sshcrypto\.node$/,
      use: 'raw-loader', // Use 'raw-loader' to include it as-is
    });

    return config;
  },
  api: {
    bodyParser: {
        sizeLimit: '1mb', // Adjust as needed
    },
    timeout: 0, // Set API route timeout to 0 (no timeout) 
  },
};

export default nextConfig;
