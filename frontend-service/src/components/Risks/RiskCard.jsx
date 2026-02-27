import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RiskCard = ({ risk }) => {
  const [showTasks, setShowTasks] = useState(false)
  const [tasksData, setTasksData] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [errorTasks, setErrorTasks] = useState(null)

  if (!risk) return null

  const {
    _id,
    riskName = 'Unnamed Risk',
    exposureCategoryId,
    exposureRiskWeight,
    tasks = [],
    createdAt
  } = risk

  const fetchTasks = async () => {
    if (tasks.length === 0) return

    setLoadingTasks(true)
    setErrorTasks(null)

    try {
      const results = await Promise.all(
        tasks.map(async (taskId) => {
          const res = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`)
          if (!res.ok) throw new Error(`Failed to fetch task ${taskId}`)
          return res.json()
        })
      )
      setTasksData(results)
    } catch (err) {
      console.error(err)
      setErrorTasks('Failed to load tasks')
    } finally {
      setLoadingTasks(false)
    }
  }

  const handleToggleTasks = () => {
    setShowTasks((prev) => !prev)
    if (!showTasks && tasksData.length === 0) {
      fetchTasks()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-bold text-indigo-600 mb-2">{riskName}</h3>

      <p className="text-gray-700 mb-2">
        Risk Weight: <span className="font-semibold ml-1">{exposureRiskWeight ?? 'N/A'}</span>
      </p>

      <p className="text-gray-500 text-sm mb-3 break-all">
        Exposure Category ID: {exposureCategoryId ?? 'N/A'}
      </p>

      <button
        onClick={handleToggleTasks}
        className="text-indigo-500 hover:text-indigo-600 mb-2"
      >
        {showTasks ? 'Hide Tasks' : `Show Tasks (${tasks.length})`}
      </button>

      {showTasks && loadingTasks && <p className="text-gray-500 text-sm">Loading tasks...</p>}
      {showTasks && errorTasks && <p className="text-red-500 text-sm">{errorTasks}</p>}

      {showTasks && !loadingTasks && tasksData.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 mb-3 text-sm">
          {tasksData.map((task) => (
            <li key={task._id}>
              <span className="font-semibold">{task.taskName || 'Unnamed Task'}</span> - {task.taskType || 'N/A'}
              {task.taskQuestionary?.answers?.length > 0 && (
                <ul className="list-decimal list-inside text-gray-500 ml-4 mt-1 text-xs">
                  {task.taskQuestionary.answers.map((answer, i) => (
                    <li key={i}>
                      {answer.question} - <strong>{answer.isRight ? 'Correct' : 'Wrong'}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {showTasks && !loadingTasks && tasksData.length === 0 && (
        <p className="text-gray-400 text-sm mb-3">No tasks assigned.</p>
      )}

      <div className="text-xs text-gray-400 mb-4">
        Created: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
      </div>

      <Link
        to={`/risks/${_id}`}
        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        View Risk
      </Link>
    </div>
  )
}

export default RiskCard