const roleRepository = require('./role.repository')


async function getRolesInformation() {
    const roles = await roleRepository.getRoles()
    return roles
}
async function getIndustryRolesInformation(industryId) {
    const roles = await roleRepository.getIndustryRoles(industryId)
    return roles
}

async function getRoleInformation(roleId) {
    const role = await roleRepository.getRoleById(roleId)
    return role
}

async function createNewRole(roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks) {
    const checkIfExists = await roleRepository.getRoleByName(roleName, companyId, industryId)
    if (checkIfExists.length !== 0) {
        return { response: `Role ${roleName} already exists` }
    } else if (checkIfExists.length === 0){
        const newRoleObj = {
            roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks
        }
        const newRole= await roleRepository.createRole(newRoleObj)
        return newRole
    }
}

async function updateRole(roleId, roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks) {
    const checkIfExists = await roleRepository.getRoleById(roleId)
    if (checkIfExists) { 
        await roleRepository.updateRole(
            roleId, roleName, roleDescription, companyId, industryId, exposureCategories, roleRisks
        )
        return {response : 'Role data updated'}
    } else if (!checkIfExists) {
        return { response: `No existing role`}
    }
}


module.exports = {
    getRolesInformation,
    getIndustryRolesInformation,
    getRoleInformation,
    createNewRole,
    updateRole
}