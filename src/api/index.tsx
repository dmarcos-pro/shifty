const baseUrlServer = process.env.SERVER_URL as string

// Helper function for making API requests
const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${baseUrlServer}${endpoint}`)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${endpoint}`)
    }
    return response.json()
  } catch (error) {
    console.error(`Erreur lors du fetch ${endpoint}:`, error)
    throw error
  }
}

// Fetch all projects
export const fetchProjects = async () => {
  return fetchData('/projects')
}

// Fetch all services
export const fetchServices = async () => {
  return fetchData('/services')
}

// Fetch all feedback
export const fetchFeedback = async () => {
  return fetchData('/feedback')
}

// Fetch navigation data
export const fetchNav = async () => {
  return fetchData('/navigation')
}

type Service = {
  id: string
}
// Fetch a specific service by ID
export const fetchService = async (name: string) => {
  try {
    const services = await fetchServices() // Reusing fetchServices here
    const service = services.find((item: Service) => item.id === name)
    if (!service) {
      throw new Error(`Service with id "${name}" not found`)
    }
    return service
  } catch (error) {
    console.error("Erreur lors du fetch /services :", error)
    throw error
  }
}
