import React, { useEffect, useState } from 'react'
import { useParams, useLoaderData, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Snipper/Spinner'
import { API_URL } from '../../App'

const RiskPage = ({ deleteRisk }) => {
  const { id } = useParams()
  const riskData = useLoaderData()
  const [risk, setRisk] = useState(riskData)
  const [loadingTasks, setLoadingTasks] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      if (!riskData.tasks?.length) return setLoadingTasks(false)

      try {
        const tasksWithData = await Promise.all(
          riskData.tasks.map(async (taskId) => {
            const res = await fetch(`${API_URL}/tasks/${taskId}`)
            if (!res.ok) {
              console.error('Failed to fetch task', taskId)
              return null
            }
            return await res.json()
          })
        )
        setRisk({ ...riskData, tasks: tasksWithData.filter(Boolean) })
      } catch (err) {
        console.error('Error fetching tasks:', err)
      } finally {
        setLoadingTasks(false)
      }
    }

    fetchTasks()
  }, [riskData])

  const onDeleteClick = (riskId) => {
    const confirm = window.confirm('Are you sure you want to delete this risk?')
    if (!confirm) return

    deleteRisk(riskId)
    toast.success('Risk deleted successfully!')
    navigate('/risks')
  }

  if (!risk) return <p className="text-center py-10">Risk not found</p>
  if (loadingTasks) return <Spinner />

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/risks"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Risk Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">
                  Exposure Category: {risk.exposureCategoryId || 'N/A'}
                </div>
                <h1 className="text-3xl font-bold mb-4">{risk.riskName || 'Unnamed Risk'}</h1>
                <p className="text-gray-700 mb-2">
                  Risk Weight: <span className="font-semibold">{risk.exposureRiskWeight ?? 'N/A'}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Created: {risk.createdAt ? new Date(risk.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">Tasks</h3>

                {risk.tasks && risk.tasks.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {risk.tasks.map((task, index) => (
                      <li key={task._id || index} className="mb-3">
                        <span className="font-semibold">{task.taskName || 'Unnamed Task'}</span> - {task.taskType || 'N/A'}
                        {task.taskQuestionary && (
                          <ul className="list-decimal list-inside text-gray-500 ml-4 mt-1 text-xs">
                            {task.taskQuestionary.answers?.map((answer, i) => (
                              <li key={i}>
                                {answer.question} - <strong>{answer.isRight ? 'Correct' : 'Wrong'}</strong>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No tasks assigned to this risk.</p>
                )}
              </div>
            </main>
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Manage Risk</h3>
                <Link
                  to={`/risks/${risk._id}/edit`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Risk
                </Link>
                <button
                  onClick={() => onDeleteClick(risk._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Risk
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}


const riskLoader = async ({ params }) => {
  const res = await fetch(`${API_URL}/risks/${params.id}`)
  if (!res.ok) throw new Error('Failed to fetch risk')
  const data = await res.json()
  return data
}

export { RiskPage as default, riskLoader }