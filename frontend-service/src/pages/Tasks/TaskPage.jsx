import React from 'react'
import { useLoaderData, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../../components/Snipper/Spinner'

const TaskPage = ({ deleteTask }) => {
  const task = useLoaderData()
  const navigate = useNavigate()

  const onDeleteClick = async (taskId) => {
    const confirm = window.confirm('Are you sure you want to delete this task?')
    if (!confirm) return

    await deleteTask(taskId)
    toast.success('Task deleted successfully!')
    navigate('/tasks')
  }

  if (!task) return <p className="text-center py-10">Task not found</p>

  return (
    <>
      {/* Back Button */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/tasks"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Task Listings
          </Link>
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

            {/* MAIN CONTENT */}
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">

                <h1 className="text-3xl font-bold mb-4">
                  {task.taskName || 'Unnamed Task'}
                </h1>

                <p className="text-gray-700 mb-2">
                  Task Type:{' '}
                  <span className="font-semibold">
                    {task.taskType || 'N/A'}
                  </span>
                </p>

                <p className="text-gray-700 mb-2">
                  Task Weight:{' '}
                  <span className="font-semibold">
                    {task.exposeTaskWieght ?? 'N/A'}
                  </span>
                </p>

                <p className="text-gray-700 mb-2">
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      task.isAccomplished
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {task.isAccomplished ? 'Accomplished' : 'Pending'}
                  </span>
                </p>

                {task.taskFilePath && (
                  <p className="text-gray-500 text-sm mt-2">
                    File:{' '}
                    <a
                      href={task.taskFilePath}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-indigo-500"
                    >
                      View File
                    </a>
                  </p>
                )}

                <p className="text-gray-400 text-sm mt-3">
                  Created:{' '}
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              {/* QUESTIONARY */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Task Questionary
                </h3>

                {task.taskQuestionary ? (
                  <>
                    <h4 className="font-semibold mb-2">
                      {task.taskQuestionary.questionTitle || 'No Title'}
                    </h4>

                    <p className="mb-4 text-gray-600">
                      {task.taskQuestionary.questionDescription || 'No Description'}
                    </p>

                    {task.taskQuestionary.answers?.length > 0 ? (
                      <ul className="list-decimal list-inside text-gray-700">
                        {task.taskQuestionary.answers.map((answer, i) => (
                          <li key={i} className="mb-2">
                            {answer.question}{' '}
                            <strong>
                              - {answer.isRight ? 'Correct' : 'Wrong'}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No answers available.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">
                    No questionary assigned to this task.
                  </p>
                )}
              </div>
            </main>

            {/* SIDEBAR */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">
                  Manage Task
                </h3>

                <Link
                  to={`/tasks/${task._id}/edit`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full block"
                >
                  Edit Task
                </Link>

                <button
                  onClick={() => onDeleteClick(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4 block"
                >
                  Delete Task
                </button>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}

const taskLoader = async ({ params }) => {
  const res = await fetch(`http://127.0.0.1:5000/tasks/${params.id}`)
  if (!res.ok) throw new Error('Failed to fetch task')
  return res.json()
}

export { TaskPage as default, taskLoader }