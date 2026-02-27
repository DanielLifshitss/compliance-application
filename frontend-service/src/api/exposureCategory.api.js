import { API_URL } from "../App"

export const fetchExposureCategories = async () => {
  const res = await fetch(`${API_URL}/exposure-categories`)
  if (!res.ok) throw new Error('Failed to fetch exposure categories')
  return res.json()
}