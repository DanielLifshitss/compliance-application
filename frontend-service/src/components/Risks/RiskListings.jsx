import React, { useState, useEffect } from 'react'
import RiskCard from './RiskCard'
import Spinner from '../Snipper/Spinner'
import { fetchRisks } from '../../api/risk.api'

const RiskListings = ({ isHome = false }) => {
  const [risks, setRisks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRisks = async () => {
      try {
        const data = await fetchRisks()
        setRisks(data)
      } catch (err) {
        console.error('Error fetching risks:', err)
        setError('Failed to load risks')
      } finally {
        setLoading(false)
      }
    }
    loadRisks()
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
          {isHome ? 'Recent Risks' : 'Browse Risks'}
        </h2>

        {risks.length === 0 ? (
          <p className="text-center text-gray-500">No risks found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {risks.map((risk) => (
              <RiskCard key={risk._id} risk={risk} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RiskListings