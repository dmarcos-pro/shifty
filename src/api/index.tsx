const baseUrlServer = process.env.SERVER_URL as string

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${baseUrlServer}/projects`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  } catch (error) {
    console.error("Erreur lors du fetch /projects :", error)
    throw error
  }
}

export const fetchServices = async () => {
  try {
    const response = await fetch(`${baseUrlServer}/services`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  } catch (error) {
    console.error("Erreur lors du fetch /services :", error)
    throw error
  }
}

export const fetchFeedback = async () => {
  try {
    const response = await fetch(`${baseUrlServer}/feedback`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.json()
  } catch (error) {
    console.error("Erreur lors du fetch /feedback :", error)
    throw error
  }
}

export const fetchNav = async () => {
  try {
    const response = await fetch(`${baseUrlServer}/navigation`)
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données de navigation",
      )
    }
    return response.json()
  } catch (error) {
    console.error("Erreur lors du fetch /navigation :", error)
    throw error // Re-lancez l'erreur pour que React Query puisse la gérer
  }
}

type Service = {
  id: string
}
export const fetchService = async (name: string) => {
  try {
    const response = await fetch(`${baseUrlServer}/services`)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données des services")
    }
    const data = await response.json()
    const service = data.find((item: Service) => item.id === name)
    return service
  } catch (error) {
    console.error("Erreur lors du fetch /services :", error)
    throw error // Re-lancez l'erreur pour que React Query puisse la gérer
  }
}
