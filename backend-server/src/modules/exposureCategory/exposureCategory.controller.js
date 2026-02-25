const exposureCategoryService = require('./exposureCategory.service')


const getExposureCategories = async (req, reply) => {
    try {
        const exposureCategories = await exposureCategoryService.getExposureCategoriesInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(exposureCategories)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createExposureCategory = async (req, reply) => {
    try {
        const { companyId, categoryName , risks, exposureCategoryWeight}  = req.body
        if (!categoryName) {
            return reply
            .send(`Invalide Exposure Category information`)
        }
        const exposureCategory =  await exposureCategoryService.createNewExposureCategory(
            companyId, categoryName, risks, exposureCategoryWeight
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(exposureCategory)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateExposureCategory = async (req, reply) => {
    try{
        const { exposureCategoryId } = req.params
        if (!exposureCategoryId) {
            return reply.send('exposureCategoryId not provided')
        } else {
            const { companyId, categoryName , risks, exposureCategoryWeight }  = req.body
            const updateExposureCategory = await exposureCategoryService.updateExposureCategory(
                exposureCategoryId ,companyId, categoryName , risks, exposureCategoryWeight
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateExposureCategory)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

module.exports = {
    getExposureCategories,
    createExposureCategory,
    updateExposureCategory
}