export const fetchRisks = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/risks')
        if (!response.ok) throw new Error('Failed to fetch risks')
        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
    }
}