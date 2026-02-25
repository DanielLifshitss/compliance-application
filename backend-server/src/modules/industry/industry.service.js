const industryRepository = require('./industry.repository')

async function getIndustriesInformation(){
    const industries = await industryRepository.getIndustries()
    return industries
}

async function createNewIndustry(industryName, exposureCategories) {
    const checkIfExists = await industryRepository.getIndustryByName(industryName)
    if (checkIfExists.length === 0) {
        const newIndustry = await industryRepository.createIndustry(industryName, exposureCategories)
        return newIndustry
    } else if (checkIfExists.length !== 0) {
        return { response : `Industry ${industryName} already exists`}
    }
}

async function updateIndustry(industryId, industryName, exposureCategories) {
    const checkIfExists = await industryRepository.getIndustryById(industryId)
      if (checkIfExists) { 
            await industryRepository.updateIndustry(industryId, industryName, exposureCategories)
            return {response : 'industry data updated'}
        } else if (!checkIfExists) {
            return { response: `No existing Industry`}
        }
}

module.exports = {
    getIndustriesInformation,
    createNewIndustry,
    updateIndustry
}