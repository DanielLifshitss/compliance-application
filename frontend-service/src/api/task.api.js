export const fetchTasks = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/tasks')
        if (!response.ok) throw new Error('Failed to fetch tasks')
        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
    }
}

