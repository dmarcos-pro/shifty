const SERVER_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
export const getBlogArticles = async () => {
  const response = await fetch(`${SERVER_URL}/api/articles`)
  
  const result = await response.json()
  return result
}

export const getServices = async () => {
  const response = await fetch(`${SERVER_URL}/api/services?populate=*`)
  
  const result = await response.json()
  return result
}

export const getCategory = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/categories`)
  
  const result = await response.json()
  return result
}

export const getHero = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/hero`)
  
  const result = await response.json()
  return result
}

export const getBrand = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/brands?populate=*`)
  
  const result = await response.json()
  return result
}

export const getFeedback = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/feedback?populate=*`)
  
  const result = await response.json()
  return result
}

export const getGlobal = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/global?populate=*`)
  
  const result = await response.json()
  return result
}

export const getPromise = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/promise?populate=*`)
  
  const result = await response.json()
  return result
}

export const getBanner = async () => {
  // Populate all fields including relations and media
  const response = await fetch(`${SERVER_URL}/api/banner`)
  
  const result = await response.json()
  return result
}

const buildPopulateUrl = (endpoint: string, fields: string[]) => {
  const params = fields.map(f => `populate[${f}][populate]=*`).join('&')
  return `${SERVER_URL}/api/${endpoint}?${params}`
}

export const getOffer = async () => {
  // Populate all fields including nested components
  const response = await fetch(buildPopulateUrl('offer', ['list']))
  
  const result = await response.json()
  return result
}