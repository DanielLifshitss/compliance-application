const companyValidation = require('./company.validation')

async function companyRoutes(fastify, options){
    //Get Companies
    fastify.get('/companies', companyValidation.getCompaniesOpts)

    //Get Companies from on tenant
    fastify.get('/company/tenant/:tenantId', companyValidation.getTenantCompaniesOpts)
    
    //Get Company
    fastify.get('/company/:companyId', companyValidation.getCompanyOpts)

    //Create Compnay
    fastify.post('/company', companyValidation.postCompanyOpts)

    //Update Company
    fastify.put('/company/:companyId', companyValidation.updateCompanyOpts)


    // //Get Company Exposed Categories
    // fastify.get('/company/:companyId/industry/:industryId/exposed-categories')

    // //Get Company Risks
    // fastify.get('')
}

module.exports = { companyRoutes }