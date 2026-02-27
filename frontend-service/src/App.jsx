import React, { useState, useEffect } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import MainLayout from './layout/MainLayout'
import LoginPage from './pages/loginPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

import RisksPage from './pages/Risks/RisksPage'
import RiskPage, { riskLoader } from './pages/Risks/RiskPage'
import EditRiskPage from './pages/Risks/EditRiskPage'

import TasksPage from './pages/Tasks/TasksPage'
import ExsposureCategoriesPage from './pages/ExposureCategories/ExsposureCategoriesPage'
import TaskPage, {taskLoader} from './pages/Tasks/TaskPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

export const API_URL = window.location.hostname.includes('localhost')
  ? 'http://127.0.0.1:5000/api'
  : 'https://backend-compliance-application.vercel.app/api/'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const exposureCategories = [
    { _id: '64f1c9b2a4d8c1a123456789', name: 'Financial' },
    { _id: '64f1c9b2a4d8c1a987654321', name: 'Operational' },
    { _id: '64f1c9b2a4d8c1aabcdef01', name: 'Compliance' },
    { _id: '64f1c9b2a4d8c1aabcdef02', name: 'Strategic' },
  ]

  const deleteRisk = async (id) => {
    await fetch(`${API_URL}/risks/${id}`, {
      method: 'DELETE',
    })
  }

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
  }

  const updateRiskSubmit = async (updatedRisk) => {
    const { id, ...riskData } = updatedRisk

    await fetch(`${API_URL}/risks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(riskData)
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <MainLayout user={user} logout={logout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="risks" element={<RisksPage />} />
          <Route
            path="risks/:id"
            element={<RiskPage deleteRisk={deleteRisk} />}
            loader={riskLoader}
          />
          <Route
            path="risks/:id/edit"
            element={
              <EditRiskPage
                updateRiskSubmit={updateRiskSubmit}
                exposureCategories={exposureCategories}
              />
            }
            loader={riskLoader}
          />

          <Route path="tasks" element={<TasksPage />} />
          <Route path="exposure-categories" element={<ExsposureCategoriesPage />} />
          <Route
              path="tasks/:id"
              element={<TaskPage deleteTask={deleteTask} />}
              loader={taskLoader}
            />

          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <AdminPage user={user} />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App