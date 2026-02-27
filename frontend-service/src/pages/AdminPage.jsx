import React, { useState, useEffect } from 'react'
import Spinner from '../components/Snipper/Spinner'
import CompanyCard from '../components/Company/CompanyCard'

const fetchAdminCompanyAndUsers = async (companyId) => {
  const companyRes = await fetch(`http://127.0.0.1:5000/company/${companyId}`)
  if (!companyRes.ok) throw new Error('Failed to fetch company')
  const companyData = await companyRes.json()

  const usersRes = await fetch(`http://127.0.0.1:5000/company/${companyId}/users`)
  if (!usersRes.ok) throw new Error('Failed to fetch company users')
  const usersData = await usersRes.json()

  return { company: companyData, users: usersData }
}

const AdminPage = ({ user }) => {
  const [companyData, setCompanyData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || user.userType !== 'Champion') return

    const loadData = async () => {
      try {
        const data = await fetchAdminCompanyAndUsers(user.companyId)
        setCompanyData(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load company data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user])

  if (!user || user.userType !== 'Champion') {
    return (
      <section className="py-6">
        <div className="container m-auto text-center">
          <p className="text-red-500 font-bold">Access Denied: Only Champions can view this page.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-10 bg-blue-50">
        <div className="container m-auto text-center">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-10 bg-blue-50">
        <div className="container m-auto text-center text-red-500">
          {error}
        </div>
      </section>
    )
  }

  if (!companyData) {
    return (
      <section className="py-10 bg-blue-50">
        <div className="container m-auto text-center text-gray-500">
          No company data found.
        </div>
      </section>
    )
  }

  const { company, users } = companyData

  return (
    <section className="py-6 bg-blue-50">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Champion Panel
        </h2>

        <CompanyCard company={company} users={users} />
      </div>
    </section>
  )
}

export default AdminPage