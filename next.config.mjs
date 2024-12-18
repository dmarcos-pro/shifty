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

    // Retourner la configuration webpack modifiée
    return config
  },
  images: {
    remotePatterns: [{
      protocol: "https", // Obligatoire : "http" ou "https"
      hostname: "zupimages.net", // Le domaine autorisé
      port: "", // Facultatif
      pathname: "/images/**", // Facultatif : chemin à autoriser
    }],
  },
}

export default nextConfig
