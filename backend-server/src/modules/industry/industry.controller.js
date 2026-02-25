const industryService = require('./industry.service')

const getIndustries = async (req, reply) => {
    try {
        const industries = await industryService.getIndustriesInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(industries)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createIndustry = async (req, reply) => {
    try {
        const { industryName, exposureCategories }  = req.body
        if (!industryName && !exposureCategories) {
            return reply
            .send(`Invalide Industry information`)
        }
        const newIndustry =  await industryService.createNewIndustry(
            industryName, exposureCategories
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newIndustry)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateIndustry = async (req, reply) => {
    try{
        const { industryId } = req.params
        if (!industryId) {
            return reply.send('industryId not provided')
        } else {
            const { industryName, exposureCategories }  = req.body
            const updateIndustry = await industryService.updateIndustry(
                industryId, industryName, exposureCategories
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateIndustry)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


module.exports = {
    getIndustries,
    createIndustry,
    updateIndustry
}