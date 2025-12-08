import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAME: 'Studio Shifty',
    SHORT_NAME: 'Shifty',
    SERVER_URL: 'http://localhost:3001',
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  },
  webpack: (config, { isServer }) => {
    const currentDir = new URL(import.meta.url).pathname
    const imagesPath = path.resolve(currentDir, '../public/images')
    const videoPath = path.resolve(currentDir, '../public/videos')

    config.resolve.alias['@images'] = imagesPath
    config.resolve.alias['@videos'] = videoPath

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|avi|mov)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    
    // Retourner la configuration webpack modifiée
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zupimages.net",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).protocol.replace(':', ''),
        hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname,
        port: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).port,
        pathname: "/uploads/**",
      },
    ],
  },
}

export default nextConfig
