const ExposureCategory = require('./exposureCategory.model')

async function getExposureCategories() {
    return await ExposureCategory.find()
}

async function getExposureCategoryByName(categoryName) {
    return await ExposureCategory.find({categoryName})
}

async function getExposureCategoryById(exposureCategoryId) {
    return await ExposureCategory.findById(exposureCategoryId)
}

async function createExposureCategory(companyId, categoryName, risks, exposureCategoryWeight){
    const newExposureCategory = new ExposureCategory()
    newExposureCategory.categoryName = categoryName
    if (companyId){
        newExposureCategory.companyId = companyId
    }
    if (risks) {
        newExposureCategory.risks = risks
    }
    if (exposureCategoryWeight) {
        if (Number(exposureCategoryWeight) > 0  && (Number(exposureCategoryWeight)) <= 10){
            newExposureCategory.exposureCategoryWeight = exposureCategoryWeight
        }
    }
    newExposureCategory.save()
    return newExposureCategory
}

async function updateExposureCategory(exposureCategoryId ,companyId, categoryName , risks, exposureCategoryWeight) {
    console.log("NICE!!!")
    const exposureCategory = await getExposureCategoryById(exposureCategoryId)
    if (categoryName){
        if(exposureCategory.categoryName !== categoryName) {
            exposureCategory.categoryName = categoryName
        }
    }
    if (companyId) {
        if(exposureCategory.companyId !== companyId) {
            exposureCategory.companyId = companyId
        }
    }
    if (exposureCategoryWeight) {
        if (Number(exposureCategoryWeight) > 0  && (Number(exposureCategoryWeight)) <= 10) {
            if (exposureCategory.exposureCategoryWeight !== exposureCategoryWeight)
                exposureCategory.exposureCategoryWeight = exposureCategoryWeight
        }
    }
    if (risks) {
        exposureCategory.risks = risks
    }
    await exposureCategory.save()
    return exposureCategory
}


module.exports = {
    getExposureCategories,
    getExposureCategoryByName,
    createExposureCategory,
    getExposureCategoryById,
    updateExposureCategory
}