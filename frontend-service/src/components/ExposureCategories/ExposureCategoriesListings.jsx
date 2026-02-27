import React, { useState, useEffect } from 'react'
import Spinner from '../Snipper/Spinner'
import ExposureCategoryCard from './ExposureCategoryCard'
import { fetchExposureCategories } from '../../api/exposureCategory.api'
import { API_URL } from '../../App'

const ExposureCategoriesListings = ({ isHome = false }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchExposureCategories()

        const categoriesWithRiskNames = await Promise.all(
          data.map(async (cat) => {
            if (!cat.risks?.length) return { ...cat, riskNames: [] }

            const risksWithNames = await Promise.all(
              cat.risks.map(async (riskId) => {
                try {
                  const res = await fetch(`${API_URL}/risks/${riskId}`)
                  if (!res.ok) return 'Unknown Risk'
                  const riskData = await res.json()
                  return riskData.riskName || 'Unnamed Risk'
                } catch {
                  return 'Unknown Risk'
                }
              })
            )
            return { ...cat, riskNames: risksWithNames }
          })
        )

        setCategories(categoriesWithRiskNames)
      } catch (err) {
        console.error('Error fetching exposure categories:', err)
        setError('Failed to load exposure categories')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container m-auto text-center">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container m-auto text-center text-red-500">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Exposure Categories' : 'Browse Exposure Categories'}
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No exposure categories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <ExposureCategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ExposureCategoriesListings