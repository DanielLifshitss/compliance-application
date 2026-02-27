import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import Spinner from '../Snipper/Spinner'
import { fetchTasks } from '../../api/task.api'

const TaskListings = ({ isHome = false }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks()
        setTasks(data)
      } catch (err) {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
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
          {isHome ? 'Recent Tasks' : 'Browse Tasks'}
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TaskListings