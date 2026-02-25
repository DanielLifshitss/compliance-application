const roleService = require('./role.service')

const getRoles = async (req, reply) => {
    try {
        const roles = await roleService.getRolesInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(roles)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getIndustryRoles = async (req, reply) => {
    try {
        const industryId  = req.params
        const role = await roleService.getIndustryRolesInformation(industryId.industryId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(role)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getRole = async (req, reply) => {
    try{
        const { roleId } = req.params
        if (!roleId){
            return reply
            .send(`Invalide role Id: ${roleId}`)
        }
        const respRole = await roleService.getRoleInformation(roleId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(respRole)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createRole = async (req, reply) => {
    try {
        const { 
            roleName,
            roleDescription,
            companyId,
            industryId,
            exposureCategories,
            roleRisks
        }  = req.body
        if (!industryId && !roleName) {
            return reply
            .send(`Invalide Role information`)
        }
        const newRole =  await roleService.createNewRole(
            roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newRole)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateRole = async (req, reply) => {
    try{
        const { roleId } = req.params
        if (!roleId) {
            return reply.send('roleId not provided')
        } else {
            const { 
                roleName,
                roleDescription,
                companyId,
                industryId,
                exposureCategories,
                roleRisks
            }  = req.body
            const updateRole = await roleService.updateRole(
                roleId, roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateRole)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


module.exports = {
    getRoles,
    getRole,
    createRole,
    getIndustryRoles,
    updateRole
}