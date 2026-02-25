const tenantValidation = require('./tenant.validation')

async function tenantRoutes(fastify, options){
    //Get all tenants
    fastify.get('/tenants', tenantValidation.getTenantsOpts)

    // //Get tenant
    fastify.get('/tenant/:tenantId', tenantValidation.getTenantOpts)

    //Create tenant
    fastify.post('/tenant', tenantValidation.postTenantOpts)

    // //Update tenant
    fastify.put('/tenant/:tenantId', tenantValidation.updateTenantOpts)

    // //Delete tenant
    // fastify.delete('/tenant/:id')
}

module.exports = { tenantRoutes }