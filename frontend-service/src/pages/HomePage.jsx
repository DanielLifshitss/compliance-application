import React from 'react'
import Hero from '../components/Hero/Hero'
import HomeCards from '../components/HomeCards'
import JobListings from '../components/JobListings'
import TaskListings from '../components/Tasks/TaskListings'
import ViewAllTasks from '../components/Tasks/ViewAllTasks'

const HomePage = () => {
    return (
        <>
            <Hero
                title={'Daniel Compliance Application'}
                subtitle={'Our System will save your Company lifecycle and environment'} />
            <HomeCards />
            <TaskListings isHome={true}/>
            <ViewAllTasks />
        </>
    )
}

export default HomePage
