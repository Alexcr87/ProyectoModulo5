/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staticPageGenerationTimeout: 30 // Ajusta el tiempo límite (en segundos)
      },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname: 'res.cloudinary.com',
                port:"",
                pathname:"/**",
            },
        ]
    }
};

export default nextConfig;
