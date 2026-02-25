const { getUser, getUsers , addUser, deleteUser, updateUser } = require('./user.controller')

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    lastName: {type: 'string'},
    phoneNumber: {type: 'string'},
    companyId: {type:'string'},
    roldeId: {type: 'string'},
    userType: {type: 'string'},
    email: {type: 'string'},
    createdAt: {
      type: 'string',
       format: 'date-time'
      },
    updatedAt: {
      type: 'string',
       format: 'date-time'
      },

  }
}

const getUsersOpts = {
  schema: {
    tags: ['Users'],
    summary: 'Get all users',
    response: {
      200: {
        type: 'array',
        items: User
      }
    }
  },
  handler: getUsers
}

const getUserOpts = {
  schema: {
    tags: ['Users'],
    summary: 'Get user by ID',
    response: {
      201: User
    }
  },
  handler: getUser
}

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      },
      required: ['name']
    },
    tags: ['Users'],
    summary: 'Get user by ID',
    response: {
      200: User,
      
    },
    required:['name']
  },
  handler: addUser
}

const deleteUserOpts = {
  schema: {
    tags: ['Users'],
    summary: 'Delete user by ID',
    response: {
      201: User,
      
    },
    required:['id']
  },
  handler: deleteUser
}

const updateUserOpts = {
  schema: {
    tags: ['Users'],
    summary: 'Get user by ID',
    response: {
      201: User
    }
  },
  handler: updateUser
}

async function userRoutes (fastify, options) {
  fastify.get('/users', getUsersOpts)
  fastify.get('/users/:id', getUserOpts)
//   Create User
  fastify.post('/users', postUserOpts)

//   Delete User
  fastify.delete('/users/:id',deleteUserOpts)

//   Update User
    fastify.put('/users/:id', updateUserOpts)
}

module.exports = { userRoutes, User }