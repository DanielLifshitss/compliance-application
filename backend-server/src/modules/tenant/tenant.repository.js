const Tenant = require('./tenant.model')

async function getTenants() {
    const tenants = await Tenant.find()
    return tenants
}

async function getTenantById(tenantId) {
    return await Tenant.findById(tenantId) 
}
async function  getTenantByName(tenantName) {
    return await Tenant.find({tenantName: `${tenantName}`})
}

async function createTenant(tenantName, buyerId) {
    if (!buyerId){
        return await Tenant.create(tenantData)
    } else if (buyerId) {
        return await Tenant.create({tenantName: tenantName, buyerId: buyerId})
    }
}

async function updateTenant(tenantId, tenantName, buyerId) {
    const existingTenantData = await getTenantById(tenantId)
    if (!tenantName && buyerId) {
        if (existingTenantData.buyerId !== buyerId) {
            const update = { buyerId  ,updatedAt: Date.now()}
            return await Tenant.findByIdAndUpdate(tenantId, update, {returnDocument: 'after', runValidators: true })
        } else {
            return {}
        }
    } else if (!buyerId && tenantName) {
        if (existingTenantData.tenantName !== tenantName){
            const update = { tenantName , updatedAt: Date.now()}
            return await Tenant.findByIdAndUpdate(tenantId, update, { returnDocument: 'after', runValidators: true })
        }
    } else {
        if (existingTenantData.tenantName !== tenantName && existingTenantData.buyerId !== buyerId){
            const update = { buyerId , tenantName , updatedAt: Date.now()}
            return await Tenant.findByIdAndUpdate(tenantId, update, { returnDocument: 'after', runValidators: true })
        }
    }
}


module.exports = { 
    getTenants,
    getTenantById,
    createTenant,
    getTenantByName,
    updateTenant
}