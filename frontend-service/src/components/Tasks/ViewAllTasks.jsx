import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllTasks = () => {
    return (
            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    to="/tasks"
                    className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >View All Tasks</Link>
            </section>
    )
}

export default ViewAllTasks
