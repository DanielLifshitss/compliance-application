const Industry = require('./industry.model')

async function getIndustries() {
    return await Industry.find()
}

async function getIndustryById(industryId) {
    return await Industry.findById(industryId)
}

async function getIndustryByName(industryName) {
    return await Industry.find({industryName})
}

async function createIndustry(industryName, exposureCategories){
    const newIndustry = new Industry()
    newIndustry.industryName = industryName
    newIndustry.exposureCategories = exposureCategories
    newIndustry.save()
    return newIndustry
}

async function updateIndustry(industryId, industryName, exposureCategories) {
    const industry = await getIndustryById(industryId)
    if (industryName){
        if (industry.industryName !== industryId) {
            industry.industryName = industryName
        }
    if (exposureCategories){
        industry.exposureCategories = exposureCategories
        }
    await industry.save()
    return industry
    }
}

module.exports = {
    getIndustries,
    getIndustryByName,
    createIndustry,
    getIndustryById,
    updateIndustry
}