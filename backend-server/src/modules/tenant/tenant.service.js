const tenantRepository = require('./tenant.repository')

async function getTenantsInformation() {
    const tenants = await tenantRepository.getTenants()
    return tenants
}

async function getTenantInformation(tenantId) {
    const tenant = await tenantRepository.getTenantById(tenantId)
    return tenant
}

async function createNewTenant(tenantName, buyerId) {
    const checkIfExists = await tenantRepository.getTenantByName(tenantName)
    if (checkIfExists.length !== 0) {
        return { response: `Tenant ${tenantName} already exists` }
    } else if (checkIfExists.length === 0) {
        const newTenant = await tenantRepository.createTenant(tenantName, buyerId)
        return newTenant
    }
}

async function updateTenant(tenantId, tenantName, buyerId) {
    const checkIfExists = await tenantRepository.getTenantById(tenantId)
    if (checkIfExists.tenantName === tenantName && checkIfExists.buyerId.toString() === buyerId) {
        return { response: `No data to update`}
    } else if (checkIfExists.tenantName !== tenantName && checkIfExists.buyerId.toString() === buyerId) {
        await tenantRepository.updateTenant(tenantId, tenantName, null)
        return {response: `Updated tenant ${checkIfExists.tenantName} to ${tenantName}: Id ${tenantId}`}
    } else if (checkIfExists.tenantName === tenantName && checkIfExists.buyerId.toString() !== buyerId) {
        await tenantRepository.updateTenant(tenantId, null, buyerId)
        return {response: `Updated buyerId ${checkIfExists.buyerId} to ${buyerId}: Id ${tenantId}`}
    } else if (!checkIfExists) {
        return { response: `No existing Tenant`}
    }
    
}


module.exports = {
    getTenantInformation,
    getTenantsInformation,
    createNewTenant,
    updateTenant
}