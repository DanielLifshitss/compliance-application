const userValidation = require('./user.validation')

async function userRoutes (fastify, options) {
  //Get Users
  fastify.get('/users', userValidation.getUsersOpt)

  //Get User
  fastify.get('/users/:userId', userValidation.getUserOpts)

  //Get Company Users
  fastify.get('/company/:companyId/users', userValidation.getCompanyUsersOpts)

  //Create User
  fastify.post('/users', userValidation.postUserOpts)

  //   //Update User
    fastify.put('/users/:userId', userValidation.updateUserOpts )
}

module.exports = { userRoutes }