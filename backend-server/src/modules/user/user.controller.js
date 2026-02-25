let users = require('./user.model.js')
const { v4:uuidv4 } = require('uuid')

const getUsers = (req, reply) => {
    reply.send(users)
}

const getUser = (req, reply) => {
    const {id} = req.params
    const user = users.find(item => item.id === id)
    reply.send(user)
}

const addUser = (req, reply) => {
    const {name} = req.body
    const user = {
        id: uuidv4(),
        name
    }
    users = [...users, user]

    reply.code(201).send()
}

const deleteUser = (req, reply) => {
    const {id} = req.params
    users = users.filter( user => user.id !== id)

    reply.send({message:`User ${id} has been deleted`})
}


const updateUser = (req, reply) => {
    const {id} = req.params
    const {name} = req.body

    users.map((user) => {
        if (user.id === id){
            user.name = name
            return user
        }
    })

    user = users.find(user => user.id === id)
    reply.send(user)
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    deleteUser,
    updateUser
}