import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAME: 'Studio Shifty',
    SHORT_NAME: 'Shifty',
    SERVER_URL: 'http://localhost:3001',
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
    remotePatterns: [{
      protocol: "https",
      hostname: "zupimages.net",
      port: "", // Facultatif
      pathname: "/images/**", // Facultatif
    }],
  },
}

export default nextConfig
