const companyRepository = require('./company.repository')


async function getCompaniesInformation() {
    const companies = await companyRepository.getCompanies()
    return companies
}
async function getTenantCompaniesInformation(tenantId) {
    const companies = await companyRepository.getTenantCompanies(tenantId)
    return companies
}

async function getCompanyInformation(companyId) {
    const company = await companyRepository.getCompanyById(companyId)
    return company
}

async function createNewCompany(tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language) {
    const checkIfExists = await companyRepository.getCompanyByName(companyName)
    if (checkIfExists.length !== 0) {
        return { response: `Company ${companyName} already exists` }
    } else if (checkIfExists.length === 0){
        const newCompanyObj = {
            tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language
        }
        const newComapny = await companyRepository.createCompany(newCompanyObj)
        return newComapny
    }
}

async function updateCompany(companyId, tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language) {
    const checkIfExists = await companyRepository.getCompanyById(companyId)
    if (checkIfExists) { 
        await companyRepository.updateCompany(companyId, tenantId, companyName, companyIndustryId, companyWebsiteUrl, country, language)
        return {response : 'company data updated'}
    } else if (!checkIfExists) {
        return { response: `No existing Comapny`}
    }
}


module.exports = {
    getCompaniesInformation,
    getCompanyInformation,
    createNewCompany,
    getTenantCompaniesInformation,
    updateCompany
}