import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => {
    const [showQuestionary, setShowQuestionary] = useState(false)

    if (!task) return null

    const {
        _id,
        taskName = 'Unnamed Task',
        taskType = 'N/A',
        taskQuestionary,
        exposeTaskWieght = 'N/A',
        isAccomplished = false,
        taskFilePath,
        createdAt
    } = task

    return (
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">{taskName}</h3>
            <p className="text-gray-700 mb-2">
                Task Type: <span className="font-semibold ml-1">{taskType}</span>
            </p>
            <p className="text-gray-700 mb-2">
                Task Weight: <span className="font-semibold ml-1">{exposeTaskWieght}</span>
            </p>
            <p className="text-gray-700 mb-2">
                Status:{' '}
                <span className={`font-semibold ${isAccomplished ? 'text-green-600' : 'text-red-500'}`}>
                    {isAccomplished ? 'Accomplished' : 'Pending'}
                </span>
            </p>
            {taskFilePath && (
                <p className="text-gray-500 text-sm mb-3">
                    File: <a href={taskFilePath} target="_blank" className="underline text-indigo-500">{taskFilePath}</a>
                </p>
            )}
            {taskQuestionary?._id ? (
                <button
                    onClick={() => setShowQuestionary((prev) => !prev)}
                    className="text-indigo-500 hover:text-indigo-600 mb-2"
                >
                    {showQuestionary ? 'Hide Questionary' : 'Show Questionary'}
                </button>
            ) : (
                <p className="text-gray-400 text-sm mb-3">No questionary available</p>
            )}
            {showQuestionary && taskQuestionary && (
                <div className="mb-3 text-sm text-gray-700">
                    <h4 className="font-semibold">{taskQuestionary.questionTitle || 'No Title'}</h4>
                    <p className="mb-1">{taskQuestionary.questionDescription || 'No Description'}</p>
                    <ul className="list-disc list-inside">
                        {taskQuestionary.answers?.map((ans, i) => (
                            <li key={i}>
                                {ans.question} - {ans.isRight ? 'Corrent Answer!' : 'Wrong Answer!'}
                            </li>
                        )) || <li>No answers</li>}
                    </ul>
                </div>
            )}
            <div className="text-xs text-gray-400 mb-4">
                Created: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
            </div>
            <Link
                to={`/tasks/${_id}`}
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
                View Task
            </Link>
        </div>
    )
}

export default TaskCard