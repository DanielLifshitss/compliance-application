import { API_URL } from "../App"

export const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`)
        if (!response.ok) throw new Error('Failed to fetch tasks')
        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
    }
}

