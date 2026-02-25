const tenantService = require("./tenant.service")


const getTenants = async (req, reply) => {
    try {
        const tenants = await tenantService.getTenantsInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(tenants)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}
    

const getTenant = async (req, reply) => {
    try{
        const { tenantId } = req.params
        if (!tenantId){
            return reply
            .send(`Invalide Tenant Id: ${tenantId}`)
        }
        const repsTenant = await tenantService.getTenantInformation(tenantId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(repsTenant)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createTenant = async (req, reply) => {
    try {
        const { tenantName , buyerId }  = req.body
        if (!tenantName) {
            return reply
            .send(`Invalide Tenant information`)
        }
        const newTenant =  await tenantService.createNewTenant(tenantName , buyerId)
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newTenant)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateTenant = async (req, reply) => {
    try{
        const { tenantId } = req.params
        console.log(tenantId , typeof tenantId)
        if (!tenantId) {
            return reply.send('tenantId not provided')
        } else {
            const { tenantName , buyerId } = req.body
            const updateTenant = await tenantService.updateTenant(tenantId, tenantName, buyerId)
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateTenant)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


module.exports = {
    getTenants, getTenant, createTenant, updateTenant
}