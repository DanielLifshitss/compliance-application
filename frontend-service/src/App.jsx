import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFound from './pages/NotFound'
import JobPage, { jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import TasksPage from './pages/Tasks/TasksPage'
import RisksPage from './pages/Risks/RisksPage'
import RiskPage, { riskLoader } from './pages/Risks/RiskPage'
import EditRiskPage from './pages/Risks/EditRiskPage'
import ExsposureCategoriesPage from './pages/ExposureCategories/ExsposureCategoriesPage'


const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newJob)
    })
    return
  }

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })
    return
  }
  
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(job)
    })
    return
  }

  const deleteRisk = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/risks/${id}`, {
      method: 'DELETE',
    })
    return
  }

const exposureCategories = [
  { _id: '64f1c9b2a4d8c1a123456789', name: 'Financial' },
  { _id: '64f1c9b2a4d8c1a987654321', name: 'Operational' },
  { _id: '64f1c9b2a4d8c1aabcdef01', name: 'Compliance' },
  { _id: '64f1c9b2a4d8c1aabcdef02', name: 'Strategic' },
]

const updateRiskSubmit = async (updatedRisk) => {
    const { id, ...riskData } = updatedRisk

    const res = await fetch(`http://127.0.0.1:5000/risks/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(riskData)
    })
    return
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        
        <Route index element={<HomePage />} />

        <Route path='/*' element={<NotFound />} />

        <Route path='/risks' element={<RisksPage />} />
        <Route path='/risks/:id' element={<RiskPage deleteRisk={deleteRisk}/>} loader={riskLoader} />
        <Route path="/risks/:id/edit"
            element={<EditRiskPage updateRiskSubmit={updateRiskSubmit} exposureCategories={exposureCategories} />}loader={riskLoader}/>
        
        <Route path='/tasks' element={<TasksPage />} />

        <Route path='/exposure-categories' element={<ExsposureCategoriesPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
