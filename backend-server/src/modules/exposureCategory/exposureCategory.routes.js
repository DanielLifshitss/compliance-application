const exposureCategoryValidation = require('./exposureCategory.validation')

async function exposureCategoryRoutes(fastify, options) {
    //Get Exposure Categories
    fastify.get('/exposure-categories', exposureCategoryValidation.getExposureCategoriesOpts)

    //Create Exposure Category
    fastify.post('/exposure-category', exposureCategoryValidation.postExposureCategoryOpts)

    //
    fastify.put('/exposure-category/:exposureCategoryId', exposureCategoryValidation.updateExposureCategoryOpts)
}


module.exports = { exposureCategoryRoutes }