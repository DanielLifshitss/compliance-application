const roleValidation = require('./role.validation')


async function roleRoutes(fastify, options) {
    
    //Get Roles
    fastify.get('/roles', roleValidation.getRolesOpts)

    //Get Roles By Industry
    fastify.get('/roles/industry/:industryId', roleValidation.getIndustryRolesOpts)

    //Get Role
    fastify.get('/roles/:roleId', roleValidation.getRoleOpts)

    //Create Role
    fastify.post('/roles', roleValidation.postRoleOpts)

    //Update Role
    fastify.put('/roles/:roleId', roleValidation.updateRoleOpts)
    
}


module.exports = {
    roleRoutes
}