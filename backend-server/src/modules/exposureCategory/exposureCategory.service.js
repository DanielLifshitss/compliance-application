const exposureCategoriesRepository = require('./exposureCategory.repository')

async function getExposureCategoriesInformation() {
    console.log('NICE12312312')
    const exposureCategories = await exposureCategoriesRepository.getExposureCategories()
    return exposureCategories
}

async function createNewExposureCategory(companyId, categoryName, risks, exposureCategoryWeight) {
    const checkIfExists = await exposureCategoriesRepository.getExposureCategoryByName(categoryName)    
    if (checkIfExists.length === 0) {
        const newExposureCategory = await exposureCategoriesRepository.createExposureCategory(
            companyId, categoryName, risks, exposureCategoryWeight
        )
        return newExposureCategory
    } else if (checkIfExists.length !== 0) {
        return { response : `Exposure Category ${categoryName} already exists`}
    }
}

async function updateExposureCategory(exposureCategoryId ,companyId, categoryName , risks, exposureCategoryWeight) {
    const checkIfExists = await exposureCategoriesRepository.getExposureCategoryById(exposureCategoryId)
      if (checkIfExists) { 
            await exposureCategoriesRepository.updateExposureCategory(
                exposureCategoryId ,companyId, categoryName , risks, exposureCategoryWeight
            )
            return {response : 'Exposure Category Data Updated'}
        } else if (!checkIfExists) {
            return { response: `No existing Exposure Category`}
        }
}

module.exports = {
    getExposureCategoriesInformation,
    createNewExposureCategory,
    updateExposureCategory
}