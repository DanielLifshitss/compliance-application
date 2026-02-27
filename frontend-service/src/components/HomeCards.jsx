import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const HomeCards = () => {
    return (
        <>
            <section className="py-4">
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                        <Card>
                            <h2 className="text-2xl font-bold">Your Tasks</h2>
                            <p className="mt-2 mb-4">
                                Explore Your Tasks By Risks
                            </p>
                            <Link
                                to="/tasks"
                                className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
                            >
                                GO TO TASKS
                            </Link>
                        </Card>
                        <Card bg='bg-indigo-100'>
                            <h2 className="text-2xl font-bold">Your Role Risks</h2>
                            <p className="mt-2 mb-4">
                                Explore Your Role Risks
                            </p>
                            <Link
                                to="/risks"
                                className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
                            >
                                Explore Role Risks
                            </Link>
                        </Card>
                        <Card bg='bg-indigo-100'>
                            <h2 className="text-2xl font-bold">Exposure Categories</h2>
                            <p className="mt-2 mb-4">
                                Browse Your Company Industry Exposure Categories
                            </p>
                            <Link
                                to="/jobs"
                                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                            >
                                Browse Exposure Categories
                            </Link>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeCards
