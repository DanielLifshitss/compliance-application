const industryValidation = require('./industry.validation')


async function industryRoutes(fastify, options){
    //Get Intustries
    fastify.get('/industries', industryValidation.getIndustriesOpt)

    //Create Industry
    fastify.post('/industry', industryValidation.postIndustryOpts)

    //Update Industry
    fastify.put('/industry/:industryId', industryValidation.updateIndustryOpts)
}


module.exports = { industryRoutes }