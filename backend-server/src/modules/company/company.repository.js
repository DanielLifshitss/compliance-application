const Company = require('./company.model')

async function getCompanies() {
    const companies = await Company.find()
    return companies
}

async function getTenantCompanies(tenantId) {
    console.log(tenantId)
    const companies = await Company.find({tenantId})
    console.log(companies)
    return companies
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
    console.log("NICE")
    const company = await getCompanyById(companyId)
    if (tenantId){
        if(company.tenantId.toString() !== tenantId){
            company.tenantId = tenantId
            console.log("Changed Tenant ID")
        }
    }
    if(companyName){
        if(company.companyName !== companyName){
            company.companyName = companyName
            console.log("Changed Company Name")
        }
    }
    if(companyIndustryId){
        if(company.companyIndustryId.toString() !== companyIndustryId){
            company.companyIndustryId = companyIndustryId
            console.log("Changed Industry Id")
        }
    }
    if(companyWebsiteUrl){
        if(company.companyWebsiteUrl !== companyWebsiteUrl){
            company.companyWebsiteUrl = companyWebsiteUrl
            console.log("Changed Company URL")
        }
    }
    if(country){
        if(company.country !== country){
            company.country = country
            console.log("Changed Company country")
        }
    }
    if(language){
        if(company.language !== language){
            company.language = language
            console.log("Changed Company language")
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