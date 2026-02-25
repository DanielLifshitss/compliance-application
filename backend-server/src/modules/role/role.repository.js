const Role = require('./role.model')

async function getRoles() {
    return await Role.find()
}

async function getIndustryRoles(industryId) {
    return await Role.find({industryId})
}

async function getRoleById(roleId) {
    return await Role.findById(roleId) 
}

async function  getRoleByName(roleName, companyId, industryId) {
    return await Role.find({roleName, companyId, industryId})
}

async function createRole(roleObj) {
    const newRole = Object.fromEntries(
        Object.entries(roleObj).filter(([_, value]) => value !== undefined)
    )
    return await Role.create(newRole)
}

async function updateRole(roleId, roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks){
    const role = await getRoleById(roleId)
    if(role.roleName !== roleName){
        role.roleName = roleName
    }
    if(role.industryId !== industryId){
        role.industryId = industryId
    }
    if(roleDescription){
        if(role.roleDescription !== roleDescription){
            role.roleDescription = roleDescription
        }
    }
    if(companyId){
        if(role.companyId.toString() !== companyId){
            role.companyId = companyId
        }
    }
    if(exposureCategories){
        if(role.exposureCategories !== exposureCategories){
            role.exposureCategories = exposureCategories
        }
    }
    if(roleRisks){
        if(role.roleRisks !== roleRisks){
            role.roleRisks = roleRisks
        }
    }
    await role.save()
    return role
}


module.exports = {
    getRoles,
    getIndustryRoles,
    getRoleById,
    getRoleByName,
    createRole,
    updateRole
}