import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { API_URL } from '../App'

const LoginPage = ({ setUser }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API_URL}/users`)
      const users = await res.json()

      const existingUser = users.find(
        (u) => u.name === name && u.phoneNumber === phoneNumber
      )

      if (!existingUser) {
        setError('Invalid name or phone number')
        return
      }

      // Save user globally
      setUser(existingUser)

      // Save to localStorage (so refresh doesn't logout)
      localStorage.setItem('user', JSON.stringify(existingUser))

      navigate('/')
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <section className="py-6">
      <div className="container-xl lg:container m-auto max-w-lg">
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              LOGIN
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default LoginPage