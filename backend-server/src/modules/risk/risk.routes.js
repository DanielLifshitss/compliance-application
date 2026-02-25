const riskValidation = require('./risk.validation')


async function riskRoutes(fastify, options) {
    
    //Get Risks
    fastify.get('/risks', riskValidation.getRisksOpts)

    //Get Risks By Exposure Category
    fastify.get('/risks/exsposure-category/:exposureCategoryId', riskValidation.getExsposureCategoryRisksOpts)

    //Get Risk
    fastify.get('/risks/:riskId', riskValidation.getRiskOpts)

    //Create Risk
    fastify.post('/risks', riskValidation.postRiskOpts)

    //Update Risk
    fastify.put('/risks/:riskId', riskValidation.updateRiskOpts)
    
}


module.exports = {
    riskRoutes
}