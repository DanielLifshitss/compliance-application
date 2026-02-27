import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../../components/Snipper/Spinner'
import { API_URL } from '../../App'

const ExposureCategoryPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/exposure-categories`)
        if (!res.ok) throw new Error('Failed to fetch exposure categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
        toast.error('Error fetching exposure categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const onDeleteClick = async (categoryId) => {
    const confirm = window.confirm('Are you sure you want to delete this exposure category?')
    if (!confirm) return

    try {
      const res = await fetch(`${API_URL}/exposure-category/${categoryId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      setCategories(categories.filter((cat) => cat._id !== categoryId))
      toast.success('Exposure category deleted successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Error deleting exposure category')
    }
  }

  if (loading) return <Spinner />

  if (!categories.length)
    return <p className="text-center py-10">No exposure categories found</p>

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white p-6 rounded-lg shadow-md mb-6"
                >
                  <h2 className="text-2xl font-bold mb-2">{category.categoryName}</h2>
                  <p className="text-gray-700 mb-1">
                    Company ID: <span className="font-semibold">{category.companyId || 'N/A'}</span>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Category Weight: <span className="font-semibold">{category.exposureCategoryWeight ?? 'N/A'}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Created: {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                  <div className="mb-2">
                    <h3 className="font-semibold text-indigo-800">Risks:</h3>
                    {category.risks && category.risks.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {category.risks.map((riskId, idx) => (
                          <li key={idx}>{riskId}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm">No risks assigned.</p>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteClick(category._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                  >
                    Delete Category
                  </button>
                </div>
              ))}
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default ExposureCategoryPage