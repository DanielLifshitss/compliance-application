const Company = require('./company.model')

async function getCompanies() {
    return await Company.find()
}

async function getTenantCompanies(tenantId) {
    return await Company.find({tenantId})
}

async function getCompanyById(companyId) {
    return await Company.findById(companyId) 
}

async function  getCompanyByName(companyName) {
    return await Company.find({companyName: `${companyName}`})
}

async function createCompany(companyObj) {
    const newCompany = Object.fromEntries(
        Object.entries(companyObj).filter(([_, value]) => value !== undefined)
    )
    return await Company.create(newCompany)
}

async function updateCompany(companyId, tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language){
    const company = await getCompanyById(companyId)
    if (tenantId){
        if(company.tenantId.toString() !== tenantId){
            company.tenantId = tenantId
        }
    }
    if(companyName){
        if(company.companyName !== companyName){
            company.companyName = companyName
        }
    }
    if(companyIndustryId){
        if(company.companyIndustryId.toString() !== companyIndustryId){
            company.companyIndustryId = companyIndustryId
        }
    }
    if(companyWebsiteUrl){
        if(company.companyWebsiteUrl !== companyWebsiteUrl){
            company.companyWebsiteUrl = companyWebsiteUrl
        }
    }
    if(country){
        if(company.country !== country){
            company.country = country
        }
    }
    if(language){
        if(company.language !== language){
            company.language = language
        }
    }
    await company.save()
    return company
}


module.exports = {
    getCompanies,
    getCompanyById,
    getCompanyByName,
    createCompany,
    getTenantCompanies,
    updateCompany
}