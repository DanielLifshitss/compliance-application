const companyService = require('./company.service')

const getCompanies = async (req, reply) => {
    try {
        const companies = await companyService.getCompaniesInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(companies)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getTenantCompanies = async (req, reply) => {
    try {
        const tenantId  = req.params
        const companies = await companyService.getTenantCompaniesInformation(tenantId.tenantId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(companies)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getCompany = async (req, reply) => {
    try{
        const { companyId } = req.params
        console.log(companyId)
        if (!companyId){
            return reply
            .send(`Invalide Tenant Id: ${companyId}`)
        }
        const respCompany = await companyService.getCompanyInformation(companyId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(respCompany)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createCompany = async (req, reply) => {
    try {
        const { 
            tenantId,
            companyName,
            companyIndustryId,
            companyWebsiteUrl,
            country,
            language
        }  = req.body
        if (!companyName && !companyIndustryId, !country) {
            return reply
            .send(`Invalide Company information`)
        }
        const newCompany =  await companyService.createNewCompany(
            tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newCompany)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateCompany = async (req, reply) => {
    try{
        const { companyId } = req.params
        if (!companyId) {
            return reply.send('companyId not provided')
        } else {
            const { 
                tenantId,
                companyName,
                companyIndustryId,
                companyWebsiteUrl,
                country,
                language
            }  = req.body
            const updateCompany = await companyService.updateCompany(
                companyId ,tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateCompany)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    getTenantCompanies,
    updateCompany
}