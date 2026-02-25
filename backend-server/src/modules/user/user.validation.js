const userController = require('./user.controller')

const User = {
    type:'object',
    properties:{
        _id: {type:'string'},
        name: {type: 'string'},
        lastName: {type: 'string'},
        phoneNumber: {type: 'string'},
        companyId: {
            type:'array',
            items: { type: 'string' }
        },
        role_id: {type: 'string'},
        userType: {type: 'string'},
        email: {type: 'string'}
    }
}

const getUsersOpt = {
    schema: {
            tags: ['User'],
            summary: 'Get all Users',
            response: {
            200: {
                type: 'array',
                items: User
            }
        }
    },
    handler: userController.getUsers
}

const getUserOpts = {
    schema: {
        tags: ['User'],
        summary: 'Get user',
        response: {
        200: User
        }
    },
    handler: userController.getUser
}

const getCompanyUsersOpts = {
    schema: {
            tags: ['User'],
            summary: 'Get all Users',
            response: {
            200: {
                type: 'array',
                items: User
            }
        }
    },
    handler: userController.getCompanyUsers
}

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {type: 'string'},
        lastName: {type: 'string'},
        phoneNumber: {type: 'string'},
        companyId: {
            type:'array',
            items: { type: 'string' }
        },
        role_id: {type: 'string'},
        userType: {type: 'string'},
        email: {type: 'string'},
      },
      required: ['phoneNumber' , 'role_id' , 'name' , 'lastName', 'companyId'],
      additionalProperties: false
    }
  },
  handler: userController.createUser
}

const updateUserOpts = {
    schema: {
        tags: ['User'],
        summary: 'Update user',
        response: {
        201: User
        }
    },
    handler: userController.updateUser
}

module.exports = {
    User,
    getUsersOpt,
    getUserOpts,
    getCompanyUsersOpts,
    postUserOpts,
    updateUserOpts
}